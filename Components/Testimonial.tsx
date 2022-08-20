import Image from 'next/image'
import React from 'react'
import testifier from '../public/testimonial.png'

const Testimonial = () => {
  return (
    <div className="px-10 bg-special-background py-24">
      <div className="px-16 py-12 bg-testimonial-background filter-blur rounded-md">
        <p className="text-4xl text-white opacity-100">
          What Are People Saying?
        </p>
        <div className="flex justify-between mx-12 relative my-24 pb-24">
          <div className="flex flex-col h-36 w-96 border-x-2 border-y-2 border-red-700 px-8 py-2 rounded-lg relative">
            <p className="text-white text-center font-bold text-xl pb-2">
              Unique Blockchain
            </p>
            <p className="text-white text-center pb-4">
              {' '}
              Because NFTs operate on a blockchain network, they can aid in the
              assignment of property to a specific fund.{' '}
            </p>
            <div className="bg-white text-center flex mx-auto px-8 py-1 rounded-md absolute bottom-0  translate-y-3/4">
              <div className="w-8 h-8 rounded-full">
                <Image
                  src={testifier}
                  alt="testtifier"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <div className="flex flex-col pl-4 text-left">
                <p className="text-black font-semibold">Mo Park</p>
                <p className="text-black font-normal text-sm">
                  CEO Raba Enterprises
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[18rem] w-[30rem] border-x-2 border-y-2 border-red-700 px-8 rounded-xl absolute translate-x-2/4 translate-y-[-10%] z-20 bg-gradient-to-r from-[#B51F98] via-[#80150E] to-[#932119]">
            <p className="text-white text-center font-bold text-3xl py-4">
              The Best NFT Marketplace
            </p>
            <p className="text-white text-center text-2xl py-4">
              {' '}
              Zoidac is the best NFT Market place there is. It The main benefit
              of non-fungible tokens is the ability to prove ownership.{' '}
            </p>
            <div className="bg-white text-center flex mx-auto px-8 py-1 rounded-md absolute bottom-0 translate-x-24 translate-y-3/4">
              <div className="w-8 h-8 rounded-full">
                <Image
                  src={testifier}
                  alt="testtifier"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <div className="flex flex-col pl-4 text-left">
                <p className="text-black font-semibold">Mo Park</p>
                <p className="text-black font-normal text-sm">
                  CEO Raba Enterprises
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-36 w-96 border-x-2 border-y-2 border-red-700 px-8 py-2 rounded-lg relative">
            <p className="text-white text-center font-bold text-xl pb-2">
              Unique Blockchain
            </p>
            <p className="text-white text-center pb-4">
              {' '}
              Because NFTs operate on a blockchain network, they can aid in the
              assignment of property to a specific fund.{' '}
            </p>
            <div className="bg-white text-center flex mx-auto px-8 py-1 rounded-md absolute bottom-0 translate-x-8 translate-y-3/4">
              <div className="w-8 h-8 rounded-full">
                <Image
                  src={testifier}
                  alt="testtifier"
                  height={'100%'}
                  width={'100%'}
                />
              </div>
              <div className="flex flex-col pl-4 text-left">
                <p className="text-black font-semibold">Mo Park</p>
                <p className="text-black font-normal text-sm">
                  CEO Raba Enterprises
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
