import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const router = useRouter()
    const q = router.query.token
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState();
    useEffect(()=>{
        

    },[]);
    const handleChange = (e)=>{
        if(e.target.name=="email"){
            setEmail(e.target.value)
        }
        else if(e.target.name=="npassword"){
            setPassword(e.target.value);
        }

        else if(e.target.name=="cpassword"){
            setConfirmPassword(e.target.value);

        }

        

    }

    const sendMail = async (e)=>{
        e.preventDefault();
        const body = {email}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forget`, requestOptions);

        let response = await res.json();

        if(response.success){
            toast.success('Password Successfully Changed', {
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
    }




    const handleSubmit = async (e)=>{
        e.preventDefault();
        const body = {token: q, id: router.query.id, password , confirmPassword};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/newPassword`, requestOptions);
        let response = await res.json();
        setPassword('')
        setConfirmPassword('');
        if(response.success){
            toast.success('Password Successfully Changed', {
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
    }
  return (
    <div>
    <section className="bg-gray dark:bg-white-900 h-screen">
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
        <Link href={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Image height={20} width={100} src='/logo.svg' className='mx-10' alt=''/> 
        </Link>
        <div className="w-full bg-gray rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {!q &&<div className="p-6 space-y-4 md:space-y-6 sm:p-8"> <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Send link on email
        </h1>
        <form onSubmit={sendMail} className="space-y-4 md:space-y-6" >
            <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-bold dark:text-white">Email</label>
                <input value={password} onChange={handleChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required=""/>
            </div><button type="submit"  className="flex ml-14 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Send Reset Link</button>
            </form></div>}
            {q && <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Reset Password
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                    <div>
                        <label for="npassword" className="block mb-2 text-sm font-medium text-gray-bold dark:text-white">New Password</label>
                        <input value={password} onChange={handleChange} type="password" name="npassword" id="npassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required=""/>
                    </div>
                    <div>
                        <label for="cpassword" className="block mb-2 text-sm font-medium text-gray-bold dark:text-white">Confirm New Password</label>
                        <input  value={confirmPassword} onChange={handleChange} type="password" name="cpassword" id="cpassword" placeholder="Confirm New Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <button type="submit"  className="flex ml-14 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Change Password</button>
                </form>
            </div>}
        </div>
    </div>
  </section></div>
  )
}

export default Login