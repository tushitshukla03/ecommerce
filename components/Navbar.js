import Link from 'next/link'
import Image from 'next/image';
import React, { useRef,useState,useEffect } from 'react'
import {AiFillCloseCircle, AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import {BsFillBagCheckFill,BsFillPersonFill} from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Niconne } from 'next/font/google';

function Navbar({logout, user,cart, addToCart, removeFromCart,clearCart,subTotal}) {
  const [dropdown, setDropdown] = useState(false);
  const [login,setLogin] = useState(); 
  
  const nice = ()=>{
    if (dropdown){
      setDropdown(false);

    }else{
      setDropdown(true);
    }

  }
  useEffect(()=>{
    const fun = async()=>{
         
         
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({token: JSON.parse(localStorage.getItem('myuser')).token})
          };
          let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify`, requestOptions);
          let response = await res.json();
          if(response.success){
            setLogin(true)
          }
        }
    if(localStorage.getItem('myuser')){
       fun()
        
    }
    
    
  },[]);
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

  const hide = ()=>{
    if(bar.current.classList.contains('hidden')){
      bar.current.classList.remove('hidden')
   
    }
    else if(!bar.current.classList.contains('hidden')){
      bar.current.classList.add('hidden')
      
    }
         
  };

  const bar = useRef();

  const ref  = useRef(null)
  return (
    <nav  className="shadow top-0 bg-white z-10 " style={{position:"sticky"}}>
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
      />
    
  <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
    <div className="flex justify-between items-center">
      <div className='flex '>
        <Link className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href={"/"}>DAMNGOOD</Link>
      </div>

      <div className="flex md:hidden">
        <button onClick={hide} type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
          </svg>
        </button>
      </div>
    </div>

   <div ref={bar} className='hidden w-full md:flex md:items-center md:w-auto'><div className="md:flex items-center">
      <div className="flex flex-col md:flex-row md:mx-6">
      <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={'/'}>Home</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={"/tshirt"}>Tshirt</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={"/hoodies"}>Hoodies</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={"/about"}>About</Link>
        <Link className="my-1 text-sm text-gray-700 font-medium hover:text-gray-500 md:mx-4 md:my-0" href={'/admin/login'}>Admin Page</Link>
      </div>
      <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} onClick={nice}>
      {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} onClick={nice} className="absolute  bg-gray-300 md:top-9 md:py-4 md:right-40 right:20 rounded-md px-5 z-10 w-36">
        <ul>
          <Link href={`/myaccount`}><li className='py-1.5 hover:text-slate-500 text-sm font-bold'>My Account</li></Link>
          <Link href={'/orders'}><li className='py-1.5 hover:text-slate-500 text-sm font-bold'>Orders</li></Link>
          <Link href={'/login'}><li  onClick={logout} className='py-1.5 hover:text-slate-500 text-sm font-bold '>Logout</li></Link>
        </ul>
      </div>}
      {user.value &&<BsFillPersonFill  className=' md:-mr-2 md:ml-12 my-1'/>}</a>
      {!user.value && <Link href={'/login'}><button className='bg-gray text-sm text-gray-600 ml-0 mr-5'>Login</button></Link>}
      <div onClick={toggleCart} className="cursor-pointer flex justify-center md:block">
        <a className="relative text-gray-700 hover:text-gray-600 md:left-10 right-40 md-right-0 my-2 md:my-0" href="#">
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
        <div className='item flex my-5 p-2'>
            <img src={cart[k].img} className="h-28 w-32 rounded-lg "/>
            <div className='w-2/3 font-semibold m-auto pl-5 pr-2'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
            <div className='flex font-semibold items-center justify-center w-1/3'><AiOutlineMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=""/><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].size, cart[k].variant)}} className=''/></div>
        </div></li>)})}
    </ol>
    <div className="flex">
    <Link href={'/checkout'}><button disabled={Object.keys(cart).length===0 || !login} className="flex mr-2 text-white disabled:bg-gray-300 bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-lg"><BsFillBagCheckFill className='m-1'/>Checkout</button></Link>
    
    <button disabled={Object.keys(cart).length===0} onClick={clearCart} className="flex mr-2 disabled:bg-gray-300 text-white bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-lg">Clear Cart</button></div>
    {!login&&<p className='my-4 text-red-800 font-semibold'>Please, login to checkout!</p>} 
  </div></div>
</nav>
  )
}

export default Navbar