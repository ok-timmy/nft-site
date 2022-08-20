import React from 'react'
import Image from 'next/image'
import NFTONE from '../public/NFT1.png'
import NFTTWO from '../public/NFT2.png'
import NFTTHREE from '../public/NFT3.png'

const Explore = () => {
  return (
    <div className="px-10 py-24 bg-special-background">
      <p className="text-white font-bold text-5xl">Explore Amazing Artworks</p>
      <div className="flex justify-between mt-16 text-white">
        <button className="border-white bg-white px-8 py-2 text-brick-purple rounded-md">
          All Items
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          Art
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          Music
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          3D Art
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          Games
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          Sports
        </button>
        <button className="hover:bg-white hover:border-white hover:rounded-md hover:text-brick-purple px-6 py-2">
          Photography
        </button>
      </div>
      <div className=" mt-16 mx-auto grid grid-cols-3">
       
       
        <div className="px-2">
          <div className="border-special-pink border-x-2 border-y-2 rounded-md">
            <Image src={NFTTHREE} alt="nftthree" height={683} width={683} />
          </div>
        </div>
        <div className="px-2 ">
          <div className="border-special-pink border-x-2 border-y-2 rounded-md">
            <Image src={NFTONE} alt="nftone" height={683} width={683} />
          </div>
        </div>
        <div className="px-2">
          <div className="border-special-pink border-x-2 border-y-2 rounded-md">
            <Image src={NFTTWO} alt="nfttwo" height={683} width={683} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore
