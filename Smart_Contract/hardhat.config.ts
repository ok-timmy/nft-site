import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "polygon",
  networks: {
     hardhat: {},
      polygon: {
        url : ` ${process.env.NODE_POLYGON_URL}`,
        accounts: [`${process.env.PRIVATE_KEY}`]
     }
  },
};

export default config;
