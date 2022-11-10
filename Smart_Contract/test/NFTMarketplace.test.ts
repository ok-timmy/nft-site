import { expect } from "chai";
import hre from "hardhat";

const toWei = (num: number) => hre.ethers.utils.parseEther(num.toString());
const fromWei = (num: number) => hre.ethers.utils.formatEther(num.toString());

describe("NFT Marketplace Test", () => {
  let deployer: any,
    address1: any,
    address2: any,
    address3: any,
    nft: any,
    marketplace: any;
  let URI = "Sample URI";
  let feePercent = 2;
  // [deployer] = await hre.ethers.getSigners();
  beforeEach(async () => {
    [deployer, address1, address2] = await hre.ethers.getSigners();
    const NFT = await hre.ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    const MARKETPLACE = await hre.ethers.getContractFactory("Marketplace");
    marketplace = await MARKETPLACE.deploy(feePercent);
  });

  describe("Check Deployment", () => {
    it("Check to confirm name and symbol of nft collection", async () => {
      expect(await nft.name()).equal("TIM NFT");
      expect(await nft.symbol()).equal("TNFT");
    });
    it("Check to confirm feeAccount and feePercent of Marketplace contract", async () => {
      // const [deployer] = await hre.ethers.getSigners();
      expect(await marketplace.feeAccount()).equal(deployer.address);
      expect(await marketplace.feePercent()).equal(feePercent);
    });
  });

  describe("Check Minting Function", () => {
    it("Check to see if Minting function is working Properly", async () => {
      await nft.connect(address1).mint(URI);
      expect(await nft.tokenCount()).equal(1);
      expect(await nft.balanceOf(address1.address)).equal(1);
      expect(await nft.tokenURI(1)).equal(URI);

      await nft.connect(address2).mint(URI);
      expect(await nft.tokenCount()).equal(2);
      expect(await nft.balanceOf(address2.address)).equal(1);
      expect(await nft.tokenURI(2)).equal(URI);
    });
  });

  describe("Making Marketplace items", () => {
    beforeEach(async () => {
      //address1 mints an nft
      await nft.connect(address1).mint(URI);
      //address1 approves marketplace to spend nft
      await nft.connect(address1).setApprovalForAll(marketplace.address, true);
    });

    it("Keep track of newly minted item, transfer NFT from seller to marketplace and emit the offered event", async () => {
      await expect(
        marketplace.connect(address1).makeItem(nft.address, 1, toWei(1))
      )
        .emit(marketplace, "offered")
        .withArgs(1, nft.address, 1, toWei(1), address1.address);

      //Owner of nft should now be the marketplace
      expect(await nft.ownerOf(1)).equal(marketplace.address);
      // Item Count should now equal to 1
      expect(await marketplace.itemCount()).equal(1);
      // Get Items from Item mapping then check to ensure they are correct
      const item = await marketplace.items(1);
      expect(item.itemId).equal(1);
      expect(item.nft).equal(nft.address);
      expect(item.tokenId).equal(1);
      expect(item.price).equal(toWei(1));
      expect(item.sold).equal(false);
    });

    it("Test should fail if price is set to zero", async () => {
      await expect(
        marketplace.connect(address1).makeItem(nft.address, 1, 0)
      ).revertedWith("Price Must be greater than 0");
    });
  });

  describe("Purchasing Item on the nft marketplace", () => {
    let price = 2;
    let totalPriceInWei;
    beforeEach(async () => {
      //address1 first mints nft
      await nft.connect(address1).mint(URI);
      //address1 approves marketplace to spend nft
      await nft.connect(address1).setApprovalForAll(marketplace.address, true);
      //address1 makes their nft a marketplace item
      await marketplace.connect(address1).makeItem(nft.address, 1, toWei(2));
    });

    it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees, and emit a NFTPurchased event", async () => {
      const sellerInitialEthbal = await address1.getBalance();
      const feeAccountInitialbal = await deployer.getBalance();
      console.log("Seller Initial Balance", sellerInitialEthbal);
      console.log("Fee AccountFinal Balance", feeAccountInitialbal);
      // Fetch total price of item to be purchased
      totalPriceInWei = await marketplace.getTotalPrice(1);
      await expect(
        marketplace.connect(address2).buyItem(1, { value: totalPriceInWei })
      )
        .emit(marketplace, "NFTPurchased")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          address1.address,
          address2.address
        );

      //Check final balances of buyer and seller
      const sellerFinalBalance = await address1.getBalance();
      const feeAccountFinalBalance = await deployer.getBalance();
      console.log("Seller Final Balance", sellerFinalBalance);
      console.log("Fee AccountFinal Balance", feeAccountFinalBalance);

      //Confirm if the account is balanced
      expect(Number(fromWei(sellerFinalBalance))).equal(
        price + Number(fromWei(sellerInitialEthbal))
      );
      // Calculate fee
      let fee = (feePercent / 100) * price;

      console.log("fee", fee);
      // feeAccount should receive fee
      expect(Number(`${Number(fromWei(feeAccountFinalBalance))}`)).equal(
        fee + Number(fromWei(feeAccountInitialbal))
      );

      expect(await nft.ownerOf(1)).equal(address2.address);
      expect((await marketplace.items(1)).sold).equal(true);
    });

    it("Should fail for invalid item ids, sold items and when not enough ether is paid", async () => {
      totalPriceInWei = await marketplace.getTotalPrice(1);
      //    fails for invalid item ids
      await expect(
        marketplace.connect(address2).buyItem(2, { value: totalPriceInWei })
      ).revertedWith("The Item You want to purchase does not exist");

      await expect(
        marketplace.connect(address2).buyItem(0, { value: totalPriceInWei })
      ).revertedWith("The Item You want to purchase does not exist");

      //fails when not enough ether is provided
      await expect(
        marketplace.connect(address2).buyItem(1, { value: toWei(price) })
      ).revertedWith(
        "You do not have enough ether to cover item price and market fee"
      );

      // address2 purchases item 1
      await marketplace
        .connect(address2)
        .buyItem(1, { value: totalPriceInWei });
      //deployer tries to purchase item 1 after it has been sold
      await expect(
        marketplace.connect(address2).buyItem(1, { value: totalPriceInWei })
      ).revertedWith("Item already Sold");
    });
  });
});
