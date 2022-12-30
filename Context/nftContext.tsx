import  React, { useState, createContext } from "react"
import { marketPlaceAddress, marketPlaceAbi } from "../nft_abis/marketPlaceAbi";
import { ipfsInterface, nftContextType, nftType } from "../Interfaces/nftInterface";
import { nftAbi, nftAddress } from "../nft_abis/nftDetails";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = "2EEr1cONIKSUutMzqezxtVsJXFs";
// process.env.PROJECT_ID;   // <---------- your Infura Project ID

const projectSecret = "072cc67028315165b77070123a12b998";
// process.env.PROJECT_KEY;  // <---------- your Infura Secret

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const nftContext = createContext<nftContextType | null>(null);

export const NftProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [account, setAccount] = useState()
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [items, setItems] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState();
  const [description, setDescription] = useState("");
  const [listedItems, setListedItems] = useState();
  const [soldItems, setSoldItems] = useState();
  const [marketPlace, setMarketPlace] = useState();
  const [nft, setNft] = useState();

  //Metamask Connection
  const web3handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from metamask
    const provider =  new ethers.providers.Web3Provider(window?.ethereum);
    // Get Signer
    const signer =  provider.getSigner();
    console.log(signer);
    console.log(marketPlaceAddress)
    console.log(marketPlaceAbi)
    loadContract(signer);
    setIsLoading(false);
  };

  //Load NFT Contract
  const loadContract =async (signer : any) => {
    const marketplace =  new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer 
    );
    console.log(marketplace);
    console.log(marketPlaceAddress)
    console.log(marketPlaceAbi)
    setMarketPlace(marketplace);
    const nft =  new ethers.Contract(nftAddress, nftAbi, signer);
    setNft(nft);
    setIsLoading(false);
  };

  // Mint Then List Function
  const mintThenList = async (result: ipfsInterface) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;

    //Mint NFT
    await nft.mint(uri);
    // Get token Id for nft
    const id = await nft.tokenCount();
    //Approve Marketplace to spend nft
    await (await nft.setApprovalForAll(marketPlace.address, true)).wait();
    //Add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketPlace.makeItem(nft.address, id, listingPrice)).wait();
  };

  // Create NFT Function
  const createNFT = async () => {
    if (!image || !price || !description || !name) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, name, description })
      );
      mintThenList(result);
    } catch (error) {
      console.log("ipfs upload error: ", error);
    }
  };

  //Upload to IPFS Function
  const uploadToIPFS = async (e: React.SyntheticEvent<EventTarget>) => {
    // console.log(client);
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const res = Buffer(reader.result);
      console.log(res);
    };

    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("IPFS Image Upload error: ", error);
      }
    }
  };

  //Load Purchased Items
  const loadPurchasedItems = async () => {
    //Fetch purchased items from marketplace by querying the NFTPurchased event

    const filter = marketPlace.filters.NFTPurchased(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketPlace.queryFilter(filter);

    //fetch metadata of each nft and add that to listedItems object
    const purchases = await Promise.all(
      results.map(async (i) => {
        //Fetch argument from each result
        i = i.args;
        //Get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId);
        //use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        //Get total price of item(item fee + price)
        const totalPrice = await marketPlace.getTotalPrice(i.itemId);

        let purchasedItems = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return purchasedItems;
      })
    );
    setPurchases(purchases);
    setIsLoading(false);
  };

  //Load Listed Items
  const loadListedItems = async () => {
    const itemCount = await marketPlace.itemCount();
    let listedItems = [];
    let soldItems = [];

    for (let index = 0; index < itemCount.length; index++) {
      const i = await marketPlace.items(index);
      if (i.seller.toLowerCase() === account) {
        // Get URI URL from nft contract
        const uri = await nft.tokenURL(i.tokenId);
        //use the uri to fetch metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        //Get total price of item
        const totalPrice = await marketPlace.getTotalPrice(i.itemId);
        //Define Listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        listedItems.push(item);
        if (i.sold) soldItems.push(item);
      }
    }

    setListedItems(listedItems);
    setSoldItems(soldItems);
    setIsLoading(false);
  };

  //Load MarketPlace Items
  const loadMarketPlaceItems = async () => {
    console.log(marketPlace);
    const itemCount = await marketPlace.itemCount();
    let itemsArray = [];
    for (let i = 1; i < itemCount.length; i++) {
      const item = await marketPlace.items(i);
      if (!item.sold) {
        //get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        //use uri to fetch nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        //get total price
        const totalPrice = await marketPlace.getTotalPrice(item.itemId);
        // Add Item to items array
        itemsArray.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItems(itemsArray);
    setIsLoading(false);
  };

  // Buy NFT Item
  const buyMarketitem = async (item: nftType) => {
    await (
      await marketPlace.buyItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketPlaceItems();
  };

  return (
    <nftContext.Provider
    value={{
      account,
      name,
      setName,
      image,
      setImage,
      description,
      setDescription,
      price,
      setPrice,
      items,
      isLoading,
      purchases,
      listedItems,
      soldItems,
      web3handler,
      buyMarketitem,
      loadMarketPlaceItems,
      loadListedItems,
      loadPurchasedItems,
      uploadToIPFS,
      createNFT,
    }}
    >
      {children}
    </nftContext.Provider>
  )
};
