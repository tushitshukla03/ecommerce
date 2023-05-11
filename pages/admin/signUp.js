import React, {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { BsEaselFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter();
    useEffect(()=>{
        if(localStorage.getItem('myadmin')){
            router.push('/admin')
        }
    },[]);
    const handleChange = (e)=>{
        if(e.target.name=="email"){
            setEmail(e.target.value)
        }
        else if(e.target.name=="password"){
            setPassword(e.target.value);
        }
        else if(e.target.name=="name"){
            setName(e.target.value);
        }
        

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const body = {name,email, password}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminSignUp`, requestOptions);
        const response = await res.json();
        if(response.success){
        setEmail('')
        setPassword('')
        setName('')
        toast.success('Your Account has been Created', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        router.push('/admin')}
        else{
            toast.warning("User already exist", {
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
        
    }
  return (
    <ThemeProvider theme={theme}>
    <style jsx global>{`
      footer {
        display: none;
      }
    `}</style>
    <FullLayout> 
    <section className="bg-gray t-0">
    <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<div className="flex flex-col items-center justify-center px-6 py-10 mx-auto md:-my-28 md:h-screen lg:py-0 content-center justify-center">
<Link href={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
<Image height={20} width={100} src='/logo.svg' className='md:mx-10' alt=''/> 
</Link>
<div className="w-full bg-gray rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create  account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
            <div>
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input value={name} onChange={handleChange}  type="name" name="name" id="name" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
            </div>
            <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
            </div>
            <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                </div>
                <div className="ml-3 text-sm">
                  <label for="terms" className="font-light text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                </div>
            </div>
            <button  className="flex ml-14 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
            Sign Up
            </button>
            <p className="text-sm font-light text-gray-500 ">
                Already have an account? <Link href={'/login'} className="font-medium text-primary-600 hover:underline ">Login here</Link>
            </p>
        </form>
    </div>
</div>
</div>
  </section></FullLayout></ThemeProvider>
  )
}

export default Signup