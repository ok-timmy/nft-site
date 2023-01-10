import { ethers } from 'ethers';
export interface nftType {
  itemId: string;
  price: string;
  totalPrice: string;
}

export interface marketPlaceInterface {
  address: string;
  items: (index: Number) => Promise<any>
  makeItem: (address:string, id: any, listingPrice:ethers.BigNumber) => Promise<any>;
  itemCount : () => Promise<any>;
  getTotalPrice: (itemId: any)=> Promise<any>
}

export interface nft {
  address: string;
  tokenCount: ()=> Promise<void>;
  mint: (uri:string) => Promise<void>;
  tokenURI: (tokenId: string) => Promise<any>
  tokenURL: (tokenId: string)=> Promise<any>
  setApprovalForAll: (address: string, value:boolean) => Promise<any>
}

export type nftContextType = {
  account: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  items: Array<Object>|undefined;
  isLoading: Boolean;
  purchases: undefined;
  listedItems?: Array<Object>;
  soldItems?: Array<Object>;
  web3Handler: () => Promise<void>;
  buyMarketitem: (item: nftType) => Promise<void>;
  loadMarketPlaceItems: () => Promise<void>;
  loadListedItems: () => Promise<void>;
  loadPurchasedItems: () => Promise<void>;
  uploadToIPFS: (e: React.SyntheticEvent<EventTarget>) => Promise<void>;
  createNFT: () => Promise<void>;
};

export interface ipfsInterface {
  path: string;
}
