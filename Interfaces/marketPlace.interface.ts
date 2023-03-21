import { ethers } from "ethers";

export interface marketPlaceInterface {
  address: string;
  items: (index: Number) => Promise<any>;
  makeItem: (
    address: string,
    id: any,
    listingPrice: ethers.BigNumber
  ) => Promise<any>;
  itemCount: () => Promise<any>;
  getTotalPrice: (itemId: any) => Promise<any>;
}
