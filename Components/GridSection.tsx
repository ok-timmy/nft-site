import React from 'react'

const GridSection = () => {
  return (
    <div className="px-36 py-12 bg-grid-background h-auto">
      <div className="mx-auto grid grid-cols-3">
        <div className="flex flex-col align-middle justify-between text-center h-24 ">
          <p className="text-5xl font-bold text-white">1000+</p>
          <p className=" text-xl font-semibold text-white">NFT</p>
        </div>
        <div className="flex flex-col align-middle justify-between text-center h-24 ">
          <p className="text-5xl font-bold text-white">200+</p>
          <p className="text-xl font-semibold text-white">Creators</p>
        </div>
        <div className="flex flex-col align-middle justify-between text-center h-24 ">
          <p className="text-5xl font-bold text-white">950+</p>
          <p className="text-xl font-semibold text-white">Sold</p>
        </div>
      </div>
    </div>
  )
}

export default GridSection
