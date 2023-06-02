import Head from "next/head";
import React, { useContext, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NFTCard from "../Components/NFTCard";
import { nftContext } from "../Context/nftContext";
import { nftContextType } from "../Interfaces/nftContext.type";

const Marketplace = () => {
  const {
    loadPurchasedItems,
    loadMarketPlaceItems,
    items,
    listedItems,
    soldItems,
    isLoading,
  } = useContext(nftContext) as nftContextType;

  useEffect(() => {
    loadMarketPlaceItems();
  }, []);

  console.log(items, isLoading, soldItems);

  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
        <meta
          name="description"
          content="List Of all NFTs on the Marketplace"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="px-12 py-12 bg-special-background">
        <header className="text-2xl text-special-pink text-left uppercase mb-8">
          Marketplace
        </header>

        <div className=" px-8 grid grid-flow-row lg:grid-cols-3 gap-8 sm:grid-cols-2">
          {items && items.length !== 0 ? (
            items.map((item) => {
              return (
                <div key={item?.itemId}>
                  <NFTCard
                    itemId={item?.itemId}
                    name={item?.name}
                    image={item?.image}
                    description={item?.description}
                    seller={item?.seller}
                    totalPrice={item?.totalPrice}
                  />
                </div>
              );
            })
          ) : (
            <div>No NFT Listed Yet</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
