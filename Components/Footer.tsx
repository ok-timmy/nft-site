import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="px-10 py-12 bg-special-background text-white">
      <div className="flex justify-between">
        <div className=' w-96 px-8'>
          <p className='text-2xl text-white mb-8'>
            <span>ZOI</span>
            <span className='text-special-pink'>DAC</span>
          </p>
          <p className='text-white text-xl'>
          Build anything you can dream of without writing code or spending high budget hiring a developer.
          </p>
          <div className='mt-8 flex mb-16'>
            <button className='bg-icon-background text-white w-6 h-6 rounded-full mr-4 px-1'><i className="bi bi-facebook"></i></button>
            <button className='bg-icon-background text-white w-6 h-6 rounded-full mr-4 px-1'><i className="bi bi-instagram"></i></button>
            <button className='bg-icon-background text-white w-6 h-6 rounded-full mr-4 px-1'><i className="bi bi-twitter"></i></button>
            <button className='bg-icon-background text-white w-6 h-6 rounded-full mr-4 px-1'><i className="bi bi-linkedin"></i></button>
          </div>
          <p>© Copyright 2021. Nocode Academy</p>
        </div>
        
        <div className=''>
            <p className='text-xl text-white font-bold mb-8'>Quick Links</p>
            <div className='flex flex-col space-y-6 justify-between'>
                <Link href={'/'} passHref><a className='text-link text-xl'>About</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>Courses</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>Tuition</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>FAQ</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>Career</a></Link>
            </div>
        </div>
        <div className=''>
            <p className='text-xl text-white font-bold mb-8'>Company</p>
            <div className='flex flex-col space-y-6 justify-between'>
                <Link href={'/'} passHref><a className='text-link text-xl'>About</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>Contact</a></Link>
                <Link href={'/'} passHref><a className='text-link text-xl'>Career</a></Link>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
