import Head from 'next/head'
import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import NFTCard from '../Components/NFTCard'

const Marketplace = () => {
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
          <NFTCard/>
          <NFTCard/>
          <NFTCard/>
          <NFTCard/>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Marketplace
