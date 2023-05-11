import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import {  useRouter } from 'next/router';
import { useEffect ,useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import '../styles/reset.css';




export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [progress, setProgress] = useState(0)

  const [subTotal, setSubTotal] = useState();
  const [user, setUser] = useState({value: null});
  const [key , setKey] = useState()
  const router = useRouter();
  useEffect(()=>{
     router.events.on('routeChangeComplete',()=>{
      setProgress(100);
     });
     router.events.on('routeChangeStart',()=>{
      setProgress(40);
     });
     try{if(localStorage.getItem("cart")){
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
     }
     }
     catch(error){
      console.error(error);
      localStorage.clear()
     }
     const myuser = JSON.parse(localStorage.getItem('myuser'))
     if(myuser){
      setUser({value:myuser})
      
     }setKey(Math.random())
  },[router.query]);

  const logout = () => {
    localStorage.removeItem('myuser');
    setUser({value:null});
    setKey(Math.random());
    router.push('/')
    toast.warning('Logged Out', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const logout1 = () => {
    localStorage.removeItem('myadmin');
    setUser({value:null});
    setKey(Math.random());
    router.push('/admin');
    toast.warning('Logged Out', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const addToCart = (itemCode,qty,price,name,size,variant,seller,img)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode]={qty:1,price,name,size,variant,seller,img}
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
  const buyNow=(itemCode,qty,price,name,size,variant,seller,img)=>{
    let newCart = {}
    newCart[itemCode]= {qty:1,price,name,size,variant,seller,img}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }
  
  return <><LoadingBar
  color="linear-gradient(to top left, #ff9966 0%, #ff0066 100%)"
  waitingTime={400}
  progress={progress}
  height={3}
  onLoaderFinished={() => setProgress(0)}
/>{key&&<Navbar logout={logout} logout1={logout1} user={user} key={key} cart={cart} buyNow={buyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>}<Component cart={cart} logout={logout} user={user}  addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}{...pageProps}/><Footer/></>
  
}
