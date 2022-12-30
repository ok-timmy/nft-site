import "@nomicfoundation/hardhat-chai-matchers";
// import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy()
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(5);

  await marketplace.deployed();
  console.log("NFT contract was deployed to", nft.address);
  console.log("Marketplace contract was deployed to", marketplace.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
