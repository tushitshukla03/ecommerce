import Link from 'next/link'
import Image from 'next/image';
import React, { useRef } from 'react'
import {AiFillCloseCircle, AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import {BsFillBagCheckFill,BsFillPersonFill} from 'react-icons/bs';

function Navbar({cart, addToCart, removeFromCart,clearCart,subTotal}) {

  const toggleCart = ()=>{
          if(ref.current.classList.contains('translate-x-full')){
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
          }
          else if(!ref.current.classList.contains('translate-x-full')){
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
          }
  }

  const ref  = useRef(null)
  return (
    <nav className="bg-white shadow sticky top-0 bg-white z-10">
  <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
    <div className="flex justify-between items-center">
      <div className='flex '>
        <Link className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href="/">DAMNGOOD</Link>
      </div>

      <div className="flex md:hidden">
        <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <div className="md:flex items-center">
      <div className="flex flex-col md:flex-row md:mx-6">
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={'/'}>Home</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href="/tshirt">Tshirt</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href="/hoodies">Hoodies</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href="/about">About</Link>
      </div>
      <Link href={'/login'}><BsFillPersonFill className='ml-10 mr-5'/></Link>
      <div onClick={toggleCart} className="cursor-pointer flex justify-center md:block">
        <a className="relative text-gray-700 hover:text-gray-600" href="#">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <span className="absolute top-0 left-0 rounded-full bg-gray-500 text-white p-1 text-xs"></span>
        </a>
      </div>
    </div>
  </div>
  <div ref ={ref} className='w-85 h-[100vh] z-10 sideCart overflow-y-scroll absolute top-0 right-0 bg-gray-100 px-8 py-10 transform transition-transform translate-x-full'>
    <h2 className='font-bold text-xl'>Shopping Cart</h2>
    <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl text-gray-500'><AiFillCloseCircle/></span>
    <ol>
    {Object.keys(cart).length==0 &&
      <div className='my-4 text-base font-normal'>Cart is Empty!</div>}
      {Object.keys(cart).map((k)=>{return(<li key={k}>
        <div className='item flex my-5'>
            <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
            <div className='flex font-semibold items-center justify-center w-1/3'><AiOutlineMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=""/><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=''/></div>
        </div></li>)})}
    </ol>
    <div className="flex">
    <Link href={'/checkout'}><button className="flex mr-2 text-white bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-lg"><BsFillBagCheckFill className='m-1'/>Checkout</button></Link> 
    <button onClick={clearCart} className="flex mr-2 text-white bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-lg">Clear Cart</button></div>
  </div>
</nav>
  
  )
}

export default Navbar