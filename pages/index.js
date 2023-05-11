import Head from 'next/head'
import {BrowserView, MobileView} from 'react-device-detect';
import { Inter } from 'next/font/google'

import Link from 'next/link'
import React,{useState} from 'react'
import Product from "@/schema/Product"; 
import mongoose from 'mongoose'

const inter = Inter({ subsets: ['latin'] })

export default function Home(t) {
  
 
  return (
    <>
      <Head>
        <title>Buy T-Shirts and Hoodies Online|DamnGood Apparel</title>
        <meta name="keywords" content="t-shirts, hoodies, graphic tees, funny t-shirts, vintage t-shirts, cool t-shirts, designer t-shirts, custom t-shirts, cotton t-shirts, printed t-shirts, sleeveless t-shirts, long sleeve t-shirts, zip-up hoodies, pullover hoodies, sweatshirts, college t-shirts, sports t-shirts, music t-shirts, animal t-shirts, political t-shirts"></meta>
        <meta name="description" content="Find the perfect t-shirt or hoodie to express your unique style. Shop DamnGood Apparel's collection of high-quality, affordable clothing today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
<BrowserView><section>
<div className=" text-white py-20 h-screen">
  <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
    <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
      <h1 className="text-3xl md:text-5xl  text-teal-900 tracking-loose">End Year Sale</h1>
      <h2 className="text-3xl md:text-5xl text-gray-500 leading-relaxed md:leading-snug mb-2">Best Brands
      </h2>
      <p className="text-sm md:text-base text-gray-400 mb-4">Explore the wide range of fashion products at the<br></br>
       best prices </p>
      <Link href={'/tshirt'}
        className="bg-transparent hover:bg-gray-300 text-gray-600 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-gray-300 hover:border-transparent">
        Explore Now</Link>
    </div>
    <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
      <div className="h-48 flex flex-wrap content-center">
        <div>
          <img className="inline-block mt-28 hidden xl:block" src={`${t.t[0]}`}/></div>
          <div>
            <img className="inline-block mt-24 md:mt-0 p-8 md:p-0"  src={`${t.t[1]}`}/></div>
            <div>
              <img className="inline-block mt-28 hidden lg:block" src={`${t.t[2]}`}/></div>
            </div>
          </div>

        </div>
      </div>
</section></BrowserView>
<MobileView>
    <div className="relative flex flex-col-reverse px-4 py-16 mx-auto lg:block lg:flex-col lg:py-32 xl:py-48 md:px-8 sm:max-w-xl md:max-w-full">
      <div className="z-0 flex justify-center h-full -mx-4 overflow-hidden lg:pt-24 lg:pb-16 lg:pr-8 xl:pr-0 lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
        <img
          src={`${t.t[0]}`}
          className="object-cover object-right h-auto lg:w-auto lg:h-full z-20"
          alt=""
        />
        <img
          src={`${t.t[1]}`}
          className="object-cover object-right h-auto lg:w-auto lg:h-full -z-20 -mx-2"
          alt=""
        />
        <img
          src={`${t.t[2]}`}
          className="object-cover object-right h-auto lg:w-auto lg:h-full z-20"
          alt=""
        />
      </div>
      <div className="relative flex justify-end max-w-xl mx-auto xl:pr-32 lg:max-w-screen-xl">
        <div className="mb-16 lg:pr-5 lg:max-w-lg lg:mb-0">
          <div className="max-w-xl mb-6">
            <div>
              <p className="inline-block mx-1 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                End Year Sale
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
             Explore the wide range{' '}
              <br className="hidden md:block" />
              of fashion products{' '}
              <span className="inline-block text-deep-purple-accent-400">
              at best prices
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg mb-5">
              Unleash Your Shopping Desire at DAMNGOOD <br></br>Where Dreams Become Delivered!
            </p>
            <Link href={'/tshirt'}
            className="bg-transparent hover:bg-gray-300 text-gray-600 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-gray-400 hover:border-transparent">
            Explore Now</Link>
          </div>
        </div>
      </div>
      
    </div>
    
</MobileView>
    
    </>
  )
}


export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI); 
}

let products = await Product.find({category:"tshirt"}).limit(3);
const t = []
const array = products.map(product =>{t.push(product.img)})
 
  
  return {
    props: {t: JSON.parse(JSON.stringify(t))}, // will be passed to the page component as props
  }
}