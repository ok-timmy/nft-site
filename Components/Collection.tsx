import Image from 'next/image'
import React from 'react'

type CollectionCardProps = {
  itemId: string;
  name: string;
  image: string;
  seller: string;
  description: string;
  totalPrice: string;
};

const Collection = ({itemId, name, description, image, totalPrice}: CollectionCardProps) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg  max-w-sm border-[1.5px] border-special-pink">
        <Image
          className="rounded-t-lg"
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          alt=""
          width={300}
          height={300}
        />
        <div className="p-6">
          <div className='flex justify-between mb-4 items-baseline'>
          <h5 className="text-special-pink text-xl font-medium uppercase">
            Bored Ape
          </h5>
          <span className='text-special-pink text-sm'>Category</span>
          </div>

          <div className="flex justify-between px-3">
            <span className="uppercase text-xl text-special-pink">
              0.005 Matic
            </span>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-special-background text-special-pink font-medium text-xs leading-tight uppercase rounded shadow-md border border-special-pink hover:bg-special-pink hover:text-special-background hover:shadow-lg focus:bg-special-pink focus:text-special-background focus:shadow-lg focus:outline-none focus:ring-0 active:bg-special-pink active:text-special-background active:shadow-lg transition duration-150 ease-in-out"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection