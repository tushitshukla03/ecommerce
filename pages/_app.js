import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { Router, useRouter } from 'next/router';
import { useEffect ,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState();
  const router = useRouter();
  useEffect(()=>{
     try{if(localStorage.getItem("cart")){
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
     }
     }
     catch(error){
      console.error(error);
      localStorage.clear()
     }
  },[])
  
  const addToCart = (itemCode,qty,price,name,size,variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode]={qty:1,price,name,size,variant}
    }

    setCart(newCart)
    saveCart(newCart)
    toast.success('Item added to the card', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  }
  const removeFromCart = (itemCode,qty,price,name,size,variant)=>{
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)

  }
  const saveCart = (myCart) =>{
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0
    let keys=Object.keys(myCart);
    for(let i=0; i<keys.length;i++){
      subt+=myCart[keys[i]].price*myCart[keys[i]].qty
    }
    setSubTotal(subt)
  }
  const buyNow=(itemCode,qty,price,name,size,variant)=>{
    let newCart= {slug: {qty:1,price,name,size,variant}}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }
  
  return <><Navbar cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/><Component cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}{...pageProps} /> <Footer/></>
  
}
