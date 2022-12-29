import React from 'react'
import Image from 'next/image'
import ImageOne from '../public/image1.png'
import NFTONE from '../public/NFT1.png'
import NFTTWO from '../public/NFT2.png'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="bg-special-background px-4 py-16">
      <div className="grid grid-flow-col grid-cols-2 px-6 py-4">
        <div className="place-self-center mr-4">
          <p className="max-w-2xl mb-4 text-3xl font-bold  leading-none md:text-5xl xl:text-5xl text-white">
            Dive into the world of
          </p>
          <p className="max-w-2xl mb-8 text-3xl font-bold text-white lg:mb-8 md:text-5xl lg:text-5xl">
            <span className="text-special-pink">NFT</span> with us
          </p>

          <p className="text-white text-xl pb-8">
            Dive into the world of priceless arts, music and much more with us.
            Explore the world of possibilities now
          </p>
          <div className="flex w-auto">
            <Link href={"/create"}>
            <button className="mr-12 px-16 rounded-md flex space-x-2 h-10 font-normal text-sm leading-3 text-link bg-special-pink border border-special-pink focus:outline-none hover:bg-transparent hover:text-special-pink duration-150 justify-center items-center">
              Create
            </button>
            </Link>
            <button className="rounded-md px-6 flex space-x-2 h-10 font-normal text-sm leading-3 text-link bg-transparent border border-special-pink  hover:text-special-pink duration-150 justify-center items-center">
              Connect Wallet
            </button>
          </div>
        </div>
        <div className=" flex mx-auto relative align-baseline">
          <div className="h-[21.3rem] w-[16rem] my-auto align-middle border-x-2 border-y-2 border-special-pink rounded-lg absolute rotate-[-12deg] right-48 bottom-4">
            <Image src={ImageOne} alt="mockup" height={400} width={300} />
          </div>
          <div className="h-[27.5rem] w-[22rem] my-auto align-middle border-x-2 border-y-2 border-special-pink rounded-lg z-20">
            <Image src={NFTONE} alt="mockup" height={560} width={450} />
          </div>
          <div className="h-[21.3rem] w-[16rem] my-auto align-middle border-x-2 border-y-2 border-special-pink rounded-lg absolute rotate-12 left-48 bottom-4">
            <Image src={NFTTWO} alt="mockup" height={400} width={300} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
