import React from 'react'
import {AiFillCloseCircle, AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import {BsFillBagCheckFill} from 'react-icons/bs';

function Checkout({cart,clearCart,addToCart,removeFromCart,subTotal}) {
  return (
    <div className="flex  flex-col container p-12 mx-auto">
     <div className=" w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col md:w-full">
                <h2 className="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                </h2>
                <form className="justify-center w-full mx-auto" method="post" action="True">
                    <div className="">
                        <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Full
                                    Name</label>
                                <input name="firstName" type="text" placeholder="Full Name"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                            
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Email"
                                    className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                <input name="Last Name" type="text" placeholder="Email"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Address"
                                    className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                <textarea
                                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    name="Address" cols="20" rows="4" placeholder="Address"></textarea>
                            </div>
                        </div>
                        <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="city"
                                    className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                <input name="city" type="text" placeholder="City"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                            <div className="w-full lg:w-1/2 ">
                                <label htmlFor="postcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                    Postcode</label>
                                <input name="postcode" type="text" placeholder="Post Code"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <label className="flex items-center text-sm group text-heading">
                                <input type="checkbox"
                                    className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"/>
                                <span className="ml-2">Save this information for next time</span></label>
                        </div>
                        
                        
                    </div>
                </form>
            </div>
    <h2 className="mb-4 font-bold md:text-xl text-heading mt-5">Review Cart Items and Pay
            </h2>
    <div className='w-full  h-full px-4 py-6 mt-5 sideCart  bg-gray-100 '>
    
    <h2 className='font-bold text-xl'>Shopping Cart</h2>
    <span  className='absolute top-2 right-2 cursor-pointer text-2xl text-gray-500'><AiFillCloseCircle/></span>
    <ol>
    {Object.keys(cart).length==0 &&
      <div className='my-4 text-base font-normal'>Cart is Empty!</div>}
      {Object.keys(cart).map((k)=>{return(<li key={k}>
        <div className='item flex my-5'> 
            <div className='w-2/3 font-semibold'>{cart[k].name } ({cart[k].size.toUpperCase()}/{cart[k].variant[0].toUpperCase()+cart[k].variant.slice(1)})</div>
            <div className='flex font-semibold items-center justify-center w-1/3'><AiOutlineMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=""/><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=''/></div>
        </div></li>)})}
        
    </ol>
    <span>subtotal: ₹{subTotal}</span>
   </div>
   <div className="mt-4 text-white">
              <button className="w-full px-6 py-2 text-700 bg-gray-600 hover:bg-blue-900">Pay ₹{subTotal}</button>
        </div>

        </div>
    </div>
  )
}

export default Checkout