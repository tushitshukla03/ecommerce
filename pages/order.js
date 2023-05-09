import React from 'react'

function Order({subTotal}) {
  return (
    <div>
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    
    
      <div className="flex justify-start item-start space-y-2 flex-col">
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-green-800">Order has been successfully placed!</p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img className="w-full hidden md:block" src="https://i.ibb.co/84qQR4p/Rectangle-10.png" alt="dress" />
                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">Premium Quaility Dress</h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">₹636.00</p>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
              <div className="w-full md:w-40">
                <img className="w-full hidden md:block" src="https://i.ibb.co/s6snNx0/Rectangle-17.png" alt="dress" />
                <img className="w-full md:hidden" src="https://i.ibb.co/BwYWJbJ/Rectangle-10.png" alt="dress" />
              </div>
              <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">Italic Minimal Design</h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                    <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">01</p>
                  <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">₹500.00</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      <div className='mt-4 font-semibold'>Subtotal: ₹{subTotal}</div>
      <button className="flex mt-5  text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded">
                  Track your order
    </button>
    </div>
    
    </div>
  )
}

export default Order