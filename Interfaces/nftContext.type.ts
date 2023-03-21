import { nftType } from "./nftType.interface";

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
  items: Array<Object> | undefined;
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
