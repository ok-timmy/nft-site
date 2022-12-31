import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import Collection from '../Components/Collection'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import NFTCard from '../Components/NFTCard'
import { nftContext } from '../Context/nftContext'
import { nftContextType } from '../Interfaces/nftInterface'

const Collections = () => {

  const {loadPurchasedItems, loadMarketPlaceItems, listedItems, soldItems, isLoading} = useContext(nftContext) as nftContextType;

  useEffect(() => {
    loadPurchasedItems();
    loadMarketPlaceItems();
  }, [])
  


  return (
    <>
    <Head>
        <title>My Collections</title>
        <meta
          name="description"
          content="List Of all my NFT Collections"
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
          My Collections
        </header>

        <div className=" px-8 grid grid-flow-row lg:grid-cols-3 gap-8 sm:grid-cols-2">
          <Collection/>
          <Collection/>
          <Collection/>
          <Collection/>
          <Collection/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Collections