import React,{useState,useEffect } from "react";
import {
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import Link from "next/link";
import logo from '../public/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function loadScript(src){
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src=src;
    script.onload=() => {resolve(true)};
    script.onerror=() => {resolve(false)};
    document.body.appendChild(script);

  })
}

function Checkout({ cart, clearCart, addToCart, removeFromCart, subTotal }) {

  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [phone, setPhone]=useState('');
  const [pincode,setPincode] = useState('');
  const [address,setAddress]= useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    const user  =  JSON.parse(localStorage.getItem('myuser'));
   
    if(user.token){
      setUser(user);
      setEmail(user.email);
    }
    
  }, [])
  

  const handleChange= async(e)=>{

    if(e.target.name=="name1"){
      setName(e.target.value);
    }
    else if(e.target.name=="email"){
      setEmail(e.target.value);
  }
    else if(e.target.name=="phone"){
    setPhone(e.target.value);
  }
    else if(e.target.name=="address"){
      setAddress(e.target.value);
    }
    else if(e.target.name=="postcode"){
      setPincode(e.target.value);
      if(e.target.value.length==6){
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if(Object.keys(pinJson).includes(e.target.value)){
    
          setState(pinJson[e.target.value][1])
          setCity(pinJson[e.target.value][0])
        }
        else{
          setState('')
          setCity('')
        }
      }else{
        setState('')
        setCity('')
      }
    }
  if(name && email && address && phone && pincode){
      setDisabled(false);
  }
  else{
     setDisabled(true);
  }
  }
  const displayRazorPay= async ()=>{
  

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
    if(!res){
      toast.error("RazorPay SDK failed to load. Please check your Internet!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      return
    };

    const datu = {cart,subTotal,email,name,address,phone,pincode,city};

    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(datu)}).then((t)=>
        t.json()
        );
    if(data.success){
      const url1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/redirect`,{method:"POST" , headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({id: data.id})}).then((t)=>t.json());
    setUrl(url1.url);

    
  }
    if(!data.success){
      clearCart();
      toast.error(data.error, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return
    }


    const options = {
      "key": "rzp_test_FAu59ejv5sPZ0y",
      "name": "DAMNGOOD", 
      "currency": data.currency.toString(),
      "amount": data.amount.toString(),
      "order_id": data.id,
      "description": "Thank you for shopping form DAMNGOOD!", 
      "image": {logo},
      "callback_url": `${url}`,
      "prefill": {
          "name": `${name}`,
          "email": `${email}`,
          "contact": `${phone}`
      },
      "notes": {
          "address": `${address}`
      },
      "theme": {
          "color": "#bbc9d3"
      }
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  
  };
  
  return (
    <div className="flex  flex-col container p-12 mx-auto">
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
    <div className=" w-full px-0 mx-auto md:flex-row">
        <div className="flex flex-col md:w-full">
          <h2 className="mb-4 font-bold md:text-xl text-heading ">
            Shipping Address
          </h2>
          <form
            className="justify-center w-full mx-auto"
            method="post"
            action="True"
          >
            <div className="">
              <div className="space-x-0 lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/2">
                  <label
                    htmlFor="name1"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={name}
                    name="name1"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  {user && user.value?<input
                    value={user.value.email}
                    name="email"
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    readOnly={true}
                  />:<input
                  onChange={handleChange}
                  value={email}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    Address
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    name="address"
                    value={address}
                    cols="20"
                    rows="4"
                    placeholder="Address"
                  ></textarea>
                </div>
              </div>
              <div className="space-x-0 lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/2">
                  <label
                    htmlFor="postcode"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    PinCode
                  </label>
                  <input
                    onChange={handleChange}
                    value={pincode}
                    name="postcode"
                    type="text"
                    placeholder="PinCode"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <label
                    htmlFor="state"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    State
                  </label>
                  <input
                    value={state}
                    onChange={handleChange}
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    
                    />
                </div></div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/2 ">
                  <label
                    htmlFor="city"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    City
                  </label>
                  <input
                    value={city}
                    onChange={handleChange}
                    id='city'
                    name="city"
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    
                    />
                </div>
                <div className="w-full lg:w-1/2 ">
                  <label
                    htmlFor="phone"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    Phone 
                  </label>
                  <input
                    onChange={handleChange}
                    value={phone}
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                </div>
              
              <div className="flex items-center mt-4">
                <label className="flex items-center text-sm group text-heading">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                  />
                  <span className="ml-2">
                    Save this information for next time
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
        <h2 className="mb-4 font-bold md:text-xl text-heading mt-5">
          Review Cart Items and Pay
        </h2>
        <div className="w-full  h-full px-4 py-6 mt-5 sideCart  bg-gray-100 ">
          <h2 className="font-bold text-xl">Shopping Cart</h2>
          <span className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-500">
            <AiFillCloseCircle />
          </span>
          <ol>
            {Object.keys(cart).length == 0 && (
              <div className="my-4 text-base font-normal">Cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size.toUpperCase()}/
                      {cart[k].variant[0].toUpperCase() +
                        cart[k].variant.slice(1)}
                      )
                    </div>
                    <div className="flex font-semibold items-center justify-center w-1/3">
                      <AiOutlineMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className=""
                      />
                      <span className="mx-2">{cart[k].qty}</span>
                      <AiOutlinePlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className=""
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span>subtotal: ₹{subTotal}</span>
        </div>
        <Link href={"/checkout"}>
          <div className="mt-4 text-white">
            <button
              disabled={disabled}
              onClick={displayRazorPay}
              className="disabled:bg-gray-300 w-full px-6 py-2 text-700 bg-gray-600 hover:bg-blue-900"
            >
              Pay ₹{subTotal}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
