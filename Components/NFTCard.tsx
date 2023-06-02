import React, { useContext } from "react";
import Image from "next/image";
import { nftContext } from "../Context/nftContext";
import { nftContextType } from "../Interfaces/nftContext.type";
import { ethers } from "ethers";

type NFTCardProps = {
  itemId: string;
  name: string;
  image: string;
  seller: string;
  description: string;
  totalPrice: string;
};

const NFTCard = ({
  itemId,
  name,
  image,
  seller,
  description,
  totalPrice,
}: NFTCardProps) => {
  const formattedPrice = Math.round(
    parseFloat(ethers.utils.formatUnits(totalPrice))
  );

  const formattedId = Math.round(parseFloat(ethers.utils.formatUnits(itemId)));

  const neededUri = image.split("ipfs/");

  const editedImageUrl = `https://nft-store.infura-ipfs.io/ipfs/${neededUri[1]}`;

  const { buyMarketitem } = useContext(nftContext) as nftContextType;

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg  max-w-sm border-[1.5px] border-special-pink">
        <Image
          className="rounded-t-lg"
          height={300}
          width={300}
          src={editedImageUrl}
          alt=""
        />
        <div className="p-6">
          <div className="flex justify-between mb-4 items-baseline">
            <h5 className="text-special-pink text-xl font-medium uppercase">
              {name}
            </h5>
            <span className="text-special-pink text-sm">{description}</span>
          </div>

          <div className="flex justify-between px-3">
            <span className="uppercase text-xl text-special-pink">
              {formattedPrice} Matic
            </span>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-special-background text-special-pink font-medium text-xs leading-tight uppercase rounded shadow-md border border-special-pink hover:bg-special-pink hover:text-special-background hover:shadow-lg focus:bg-special-pink focus:text-special-background focus:shadow-lg focus:outline-none focus:ring-0 active:bg-special-pink active:text-special-background active:shadow-lg transition duration-150 ease-in-out"
              onClick={() =>
                buyMarketitem({
                  itemId: formattedId.toString(),
                  totalPrice: formattedPrice.toString(),
                })
              }
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
