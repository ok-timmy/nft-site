import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { nftContext } from '../Context/nftContext'
import { nftContextType } from '../Interfaces/nftContext.type'

const Header = () => {
  const [show, setshow] = useState(false)
  const {web3Handler, account} = useContext(nftContext) as nftContextType

  return (
    <div className=" bg-brick-purple px-4">
      <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4">
        {/* For large and Medium-sized Screen */}
        <div className="flex justify-between ">
          <div className="font-bold text-3xl">
            <span className='text-white'>ZOI</span>
            <span className='text-special-pink'>DAC</span>
          </div>
         
          <div className="hidden sm:flex flex-row space-x-4 justify-center items-center">
            
            <Link href={'/'} passHref><a className='text-link font-bold px-3'>Home</a></Link>
            <Link href={'/marketplace'} passHref><a className='text-link font-bold px-3'>Marketplace</a></Link>
            <Link href={'/collections'} passHref><a className='text-link font-bold px-3'>Collections</a></Link>
            {/* <Link href={'/'} passHref><a className='text-link font-bold px-3'>About</a></Link> */}
    
            <button onClick={web3Handler} className="rounded-md px-6 flex space-x-2 h-10 font-normal text-sm leading-3 text-link bg-transparent border border-special-pink  hover:text-special-pink duration-150 justify-center items-center">
              {account ==="" ? "Connect Wallet" : `${account.slice(0, 5)}...${account.slice(36)}`}
            </button>
           
          </div>
          {/* Burger Icon */}
          <div
            id="bgIcon"
            onClick={() => setshow(!show)}
            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}
          >
            <svg
              className={`${show ? 'hidden' : ''}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className=" transform duration-150"
                d="M4 6H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className=" transform duration-150"
                d="M4 18H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`${show ? 'block' : 'hidden'}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Mobile and small-screen devices (toggle Menu) */}
        <div
          id="MobileNavigation"
          className={`${show ? 'block' : 'hidden'} sm:hidden mt-4 mx-auto`}
        >
          <div className="flex flex-row items-center justify-center space-x-6">
           
          </div>
          <div className="flex flex-col gap-4 mt-4 w-80 mx-auto ">
            <button onClick={web3Handler} className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-link bg-transparent border border-special-pink  hover:text-special-pink duration-150 justify-center items-center">
            {account === "" ? "Connect Wallet" : `${account.slice(0, 5)}...${account.slice(36)}`}
            </button>
            {/* <button className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-600 hover:bg-indigo-600 duration-150 justify-center items-center">
              Sign In
            </button> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
