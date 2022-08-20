import React from 'react'
import Image from 'next/image'
import ImageOne from '../public/image1.png';

const Hero = () => {
  return (
    <section className="bg-special-background px-4 py-16">
      <div className="grid grid-flow-col grid-cols-2 px-6">
        <div className="place-self-center">
          <p className="max-w-2xl mb-4 text-3xl font-bold  leading-none md:text-5xl xl:text-5xl text-white">
            Dive into the world of
          </p>
          <p className="max-w-2xl mb-8 text-3xl font-bold text-white lg:mb-8 md:text-5xl lg:text-5xl">
           <span className='text-special-pink'>NFT</span> with us
          </p>

          <p className='text-white text-xl pb-8'>
          Dive into the world of priceless arts, music and much more with us. Explore the world of possibilities now
          </p>
          <div className='flex w-auto'>
          <button className="mr-12 px-16 rounded-md flex space-x-2 h-10 font-normal text-sm leading-3 text-link bg-special-pink border border-special-pink focus:outline-none hover:bg-transparent hover:text-special-pink duration-150 justify-center items-center">
              Create
            </button>
            <button className="rounded-md px-6 flex space-x-2 h-10 font-normal text-sm leading-3 text-link bg-transparent border border-special-pink  hover:text-special-pink duration-150 justify-center items-center">
              Connect Wallet
            </button>
            </div>
        </div>
        <div className="">
          <Image
            src={
              ImageOne
            }
            alt="mockup"
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
