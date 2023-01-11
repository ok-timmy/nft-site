import Head from 'next/head'
import * as React from 'react'
import { useState, useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { config } from 'dotenv'
import { nftContext } from '../Context/nftContext'
import { nftContextType } from '../Interfaces/nftInterface'
import Image from 'next/image'

config()

// const projectId = process.env.PROJECT_ID
// // process.env.PROJECT_ID;   // <---------- your Infura Project ID

// const projectSecret = process.env.PROJECT_KEY
// // process.env.PROJECT_KEY;  // <---------- your Infura Secret

// const auth =
//   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

// const client = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// })

const Create: React.FC = () => {
  const {
    name,
    setName,
    price,
    setPrice,
    category,
    setCategory,
    description,
    setDescription,
    isLoading,
    uploadToIPFS,
    createNFT,
  } = React.useContext(nftContext) as nftContextType
  const [nftImageUrl, setNftImageUrl] = useState('')

  const displayImage = (e: any) => {
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String: any = (reader.result as string)
        .replace('data:', '')
        .replace(/^.+,/, '')
      console.log('set NFT URL Image successfully')
      setNftImageUrl(`data:image/png;base64,${base64String}`)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <Head>
        <title>Create Your NFT</title>
        <meta name="description" content="Create Your NFTs" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <div className="bg-special-background  py-16">
          <div className="mx-auto max-w-lg rounded-lg shadow-lg my-8 border border-solid border-special-pink px-4 py-8">
            <header className="text-3xl text-center text-special-pink mb-8">
              Create Your NFT
            </header>

            <form>
              {/* Image when selected */}
              {nftImageUrl && (
                <Image
                  src={`${nftImageUrl}`}
                  alt="Nft Preview"
                  height={300}
                  width={300}
                  className="my-6 rounded-lg"
                />
              )}

              {/* NFT Name */}
              <div className="form-group mb-6">
                <label
                  htmlFor="exampleInputEmail2"
                  className="form-label inline-block mb-2 text-special-pink"
                >
                  NFT Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-special-pink
        bg-special-background bg-clip-padding
        border border-solid border-hero-background
        rounded
        transition
        ease-in-out
        m-0
        focus:text-special-pink focus:bg-special-background focus:border-special-pink focus:outline-none"
                  id="exampleInputEmail2"
                  aria-describedby="nftname"
                  placeholder="Enter NFT Name"
                />
              </div>

              {/* NFT Price */}
              <div className="form-group mb-6">
                <label
                  htmlFor="exampleInputEmail2"
                  className="form-label inline-block mb-2 text-special-pink"
                >
                  NFT Price (Matic)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  autoComplete="off"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-special-pink
        bg-special-background bg-clip-padding
        border border-solid border-hero-background
        rounded
        transition
        ease-in-out
        m-0
        focus:text-special-pink focus:bg-special-background focus:border-special-pink focus:outline-none"
                  id="exampleInputEmail2"
                  aria-describedby="nftprice"
                  placeholder="Enter NFT Price"
                />
              </div>

              {/* NFT Category */}
              <div className="form-group mb-6">
                <label
                  htmlFor="exampleInputEmail2"
                  className="form-label inline-block mb-2 text-special-pink"
                >
                  NFT Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoComplete="off"
                  className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-special-pink
        bg-special-background bg-clip-padding
        border border-solid border-hero-background
        rounded
        transition
        ease-in-out
        m-0
        focus:text-special-pink focus:bg-special-background focus:border-special-pink focus:outline-none"
                  id="exampleInputEmail2"
                  aria-describedby="nftcategory"
                  placeholder="Enter NFT Category"
                />
              </div>

              {/* NFT File */}
              <div className="form-group mb-6">
                <label
                  htmlFor="formFile"
                  className="form-label inline-block mb-2 text-special-pink"
                >
                  NFT File
                </label>
                <input
                  onChange={(e) => {
                    uploadToIPFS(e)
                    displayImage(e)
                  }}
                  className="form-control
    block
    w-full
    cursor-pointer
    text-base
    font-normal
    text-special-pink
    bg-special-background bg-clip-padding
    border border-solid border-special-pink
    rounded
    transition
    ease-in-out
    m-0
    focus:text-special-pink focus:bg-special-background focus:border-special-pink focus:outline-none file:py-1 file:bg-special-background  file:text-special-pink file:mr-4 file:border-r file:border-r-special-pink file:cursor-pointer"
                  type="file"
                  id="formFile"
                  accept=".jpg, .jpeg, .png, .svg"
                />
              </div>

              <button
                onClick={createNFT}
                type="button"
                className="w-full inline-block px-6 py-1.5 border border-special-pink text-special-pink font-medium text-lg leading-normal uppercase rounded hover:bg-special-pink focus:bg-special-background focus:text-special-pink hover:text-special-background focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <div
                    className="border-special-pink spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span className="hidden">Loading...</span>
                  </div>
                ) : (
                  'List On Marketplace'
                )}
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Create

//TODO - Sort The dotenv issue.
