import React, { useState, createContext, useEffect } from "react";
import { marketPlaceAddress, marketPlaceAbi } from "../nft_abis/marketPlaceAbi";
import { nftType } from "../Interfaces/nftType.interface";
import { nftAbi, nftAddress } from "../nft_abis/nftDetails";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { ipfsInterface } from "../Interfaces/ipfs.interface";
import { nftContextType } from "../Interfaces/nftContext.type";
import { marketPlaceInterface } from "../Interfaces/marketPlace.interface";
import { nft } from "../Interfaces/nft.interface";

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

type Props = {
  children: React.ReactNode;
};

export const nftContext = createContext<nftContextType | null>(null);

const NftProvider = ({ children }: Props) => {
  const [account, setAccount] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [items, setItems] = useState<Array<Object>>();
  const [isLoading, setIsLoading] = useState(false);
  const [purchases, setPurchases] = useState<any>();
  const [description, setDescription] = useState("");
  const [listedItems, setListedItems] = useState<Array<Object>>();
  const [soldItems, setSoldItems] = useState<Array<Object>>();
  const [marketPlace, setMarketPlace] = useState<any>();
  const [nft, setNft] = useState<nft | any>();

  //Metamask Connection
  const web3Handler = async (): Promise<void> => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from metamask
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // Get Signer
    const signer = provider.getSigner();
    console.log(signer);
    console.log(marketPlaceAddress);
    console.log(marketPlaceAbi);
    loadContract(signer);
    loadListedItems();
    loadMarketPlaceItems();
    setIsLoading(false);
  };

  //Load NFT Contract
  const loadContract = async (signer: any): Promise<void> => {
    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer
    );
    // console.log(marketplaceContract);
    console.log(marketplaceContract);
    // console.log(marketPlaceAbi);
    setMarketPlace(marketplaceContract);
    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    console.log(nftContract);
    setNft(nftContract);
    setIsLoading(false);
  };

  // Mint Then List Function
  const mintThenList = async (result: ipfsInterface): Promise<void> => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    //Mint NFT
    await nft?.mint(uri);
    // Get token Id for nft
    const id = await nft?.tokenCount();
    //Approve Marketplace to spend nft
    let marketaddress = marketPlace?.address;
    let nftaddress = nft?.address;
    await (await nft?.setApprovalForAll(marketaddress as string, true))?.wait();
    //Add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());

    await marketPlace?.makeItem(nftaddress as string, id, listingPrice);
  };

  // Create NFT Function
  const createNFT = async (): Promise<void> => {
    if (!image || !price || !description || !name) return;
    setIsLoading(true);
    try {
      const result = await client.add(
        JSON.stringify({ image, name, description })
      );
      mintThenList(result);
      setIsLoading(false);
    } catch (error) {
      console.log("ipfs upload error: ", error);
    }
  };

  //Upload to IPFS Function
  const uploadToIPFS = async (
    e: React.SyntheticEvent<EventTarget>
  ): Promise<void> => {
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
  const loadPurchasedItems = async (): Promise<void> => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // Get Signer
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer
    );

    //Fetch purchased items from marketplace by querying the NFTPurchased event

    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    

    const filter = marketplaceContract?.filters?.NFTPurchased(
      null,
      null,
      null,
      null,
      null,
      account
    );
    const results = await marketplaceContract?.queryFilter(filter);

    //fetch metadata of each nft and add that to listedItems object
    const purchases = await Promise.all(
      results?.map(async (i: any) => {
        //Fetch argument from each result
        i = i.args;
        //Get uri url from nft contract
        const uri = await nftContract?.tokenURI(i.tokenId);
        //use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        //Get total price of item(item fee + price)
        const totalPrice = await marketplaceContract?.getTotalPrice(i.itemId);

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
  const loadListedItems = async (): Promise<void> => {
  
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // Get Signer
    const signer = provider.getSigner();

    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer
    );

    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    // console.log(nftContract);

    console.log("Called the load listed Items function");
    const itemCount = await marketplaceContract?.itemCount();
    console.log(
      Math.round(
        parseFloat(ethers.utils.formatUnits(itemCount)) * 10 ** 18
      ),
      "Item Count"
    );
    let listedItems = [];
    let soldItems = [];

    for (let index = 0; index < itemCount; index++) {
      const i = await marketplaceContract?.items(index);
      if (i?.seller.toLowerCase() === account) {
        // Get URI URL from nft contract
        const uri = await nftContract?.tokenURI(i.tokenId);
        const neededUri = uri.split("ipfs/");
        console.log(neededUri);
        //use uri to fetch nft metadata stored on ipfs
        const response = await fetch(`https://nft-store.infura-ipfs.io/ipfs/${neededUri[1]}`);
        const metadata = await response.json();

        //Get total price of item
        const totalPrice = await marketplaceContract?.getTotalPrice(i.itemId);
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
  const loadMarketPlaceItems = async (): Promise<void> => {

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // Get Signer
    const signer = provider.getSigner();


    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer
    );

    const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
    // console.log(marketplaceContract, nftContract);

    console.log("Called the load Marketplace items function");
    const itemCountBigNum = await marketplaceContract?.itemCount();
    const itemCount = Math.round(
      parseFloat(ethers.utils.formatUnits(itemCountBigNum)) * 10 ** 18
    )
    console.log(
      Math.round(
        parseFloat(ethers.utils.formatUnits(itemCountBigNum)) * 10 ** 18
      ),
      "Item Count"
    );

    let itemsArray = [];
    for (let i = 1; i < itemCount; i++) {
      const item = await marketplaceContract?.items(i);
      console.log(item);
      if (!item.sold) {
        //get uri url from nft contract
        const uri = await nftContract?.tokenURI(item.tokenId);
        const neededUri = uri.split("ipfs/");
        console.log(neededUri);
        //use uri to fetch nft metadata stored on ipfs
        const response = await fetch(`https://nft-store.infura-ipfs.io/ipfs/${neededUri[1]}`);
        const metadata = await response.json();

        //get total price
        const totalPrice = await marketplaceContract?.getTotalPrice(item.itemId);
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
    console.log(itemsArray)
    setItems(itemsArray);
    setIsLoading(false);
  };

  // Buy NFT Item
  const buyMarketitem = async (item: nftType): Promise<void> => {

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // Get Signer
    const signer = provider.getSigner();


    const marketplaceContract = new ethers.Contract(
      marketPlaceAddress,
      marketPlaceAbi,
      signer
    );
console.log(item.totalPrice, "Price of NFT to be bought")
    await (
      await marketplaceContract.buyItem(item.itemId, { value: item.totalPrice })
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
        category,
        setCategory,
        items,
        isLoading,
        purchases,
        listedItems,
        soldItems,
        web3Handler,
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
  );
};

export default NftProvider;
