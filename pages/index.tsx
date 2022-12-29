import type { NextPage } from 'next'
import Head from 'next/head'
import Explore from '../Components/Explore'
import Footer from '../Components/Footer'
import GridSection from '../Components/GridSection'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Testimonial from '../Components/Testimonial'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ZOIDAC NFT Marketplace</title>
        <meta name="description" content="ZOIDAC NFT Marketplace for buying and selling NFTs" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header/>
        <Hero/>
        <GridSection/>
        <Explore/>
        <Testimonial/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
