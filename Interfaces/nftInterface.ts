export interface nftType {
  itemId: string;
  price: string;
  totalPrice: string;
}

export type nftContextType = {
  account: undefined | null;
  name: string;
  setName: React.Dispatch<SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
  items: undefined;
  isLoading: Boolean;
  purchases: undefined;
  listedItems: undefined;
  soldItems: undefined;
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
