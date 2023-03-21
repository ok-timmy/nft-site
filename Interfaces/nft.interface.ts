export interface nft {
    address: string;
    tokenCount: () => Promise<void>;
    mint: (uri: string) => Promise<void>;
    tokenURI: (tokenId: string) => Promise<any>;
    tokenURL: (tokenId: string) => Promise<any>;
    setApprovalForAll: (address: string, value: boolean) => Promise<any>;
  }