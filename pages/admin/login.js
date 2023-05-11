import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
function Login() {
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
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
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const body = {email, password}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminLogin`, requestOptions);
        let response = await res.json();
        if(response.success){
            localStorage.setItem('myadmin',JSON.stringify({token:response.token,email:response.email}))
            toast.success('You have been logged in', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

        setTimeout(()=>{router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)},1000)
        
        }
        else{
            toast.error(response.error, {
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
        setEmail('')
        setPassword('')     
    }
  return (
    <ThemeProvider theme={theme}>
    <style jsx global>{`
      footer {
        display: none;
      }
    `}</style>
    <FullLayout> <div><section className="bg-gray">
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto -my-28 md:h-screen lg:py-0">
        <Link href={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
        <Image height={20} width={100} src='/logo.svg' className='mx-10' alt=''/> 
        </Link>
        <div className="w-full bg-gray rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-bold ">Your Email</label>
                        <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-bold ">Password</label>
                        <input  value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                    </div>
                    <button type="submit" className="flex ml-14 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Login</button>
                    <p className="text-sm font-light text-gray-500">
                        Don&apos;t have an account? <Link href={'/admin/signUp'} className="font-medium text-primary-600 hover:underline ">SignUp here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section></div></FullLayout></ThemeProvider>
  )
}

export default Login