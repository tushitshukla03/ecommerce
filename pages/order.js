import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Order from "@/schema/Order";
import connectDb from "@/middleware/mongoose";
import mongoose from 'mongoose';
import Image from 'next/image';
import { BrowserView, MobileView } from 'react-device-detect';

function MyOrder({order,clearCart}) {
  const products = order.products;
  const router = useRouter();
  useEffect(()=>{
    if(router.query.clearCart==1){
      clearCart();
}
  },[])
  
  return (
    
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order Id: #{order.orderId}</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row md:jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-green-800">Order has been successfully placed! Your payment is {order.status}</p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              
              <div className='md:flex-col md:mb-2 mb-10'>{Object.keys(products).map((key)=>{return <div key={key} className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 md:my-28 md:mx-60 md:space-y-0">
              <div className="pb-4 md:pb-8 w-full md:w-40">
               
              <MobileView><img className="md:hidden" height={100} width={100} src={products[key].img} alt="dress" /></MobileView>
              <BrowserView><img className="md:scale-150  md:-mx-40  md:visible " height={100} width={100} src={products[key].img} alt="dress" /></BrowserView>
            </div>
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-600"><span className='text-gray-800'>Name: </span>{products[key].name}</h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-400">Size: </span> {products[key].size}</p>
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-400">Color: </span> {products[key].variant}</p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-600"><span className='text-gray-800'>Qty: </span>{products[key].qty}</p>
                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-600"><span className='text-gray-800'>Price: </span>₹{products[key].price}</p>
                </div>
              </div>})}</div>
            </div>
          </div>
        </div>
        
      </div>
      <div className='mt-4 font-semibold'>Subtotal: ₹{order.amount}</div>
      <button className="flex mt-5  text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded">
            Track your order
    </button>
    </div>
    
  
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI); 
}


let order = await Order.findById(context.query.id);
  return {
    props: {order: JSON.parse(JSON.stringify(order))},
  }
} 


export default MyOrder