import React ,{useEffect,useState} from 'react'

import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Orders() {
  const router = useRouter();
  const [order, setOrder] = useState([])
  useEffect(()=>{
        const fetchOrder = async()=>{
            let t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`,{method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: JSON.parse(localStorage.getItem('myuser')).token})})
            let res = await t.json();
            if(res.success) {
                setOrder(res.order);
            }
            else{
                toast.error(res.error, {
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
        if(!localStorage.getItem('myuser')){
            router.push('/')

        }
        else{
            fetchOrder();
        }
        
    },[]);
  return (
        
     <div className="container  h-screen mt-40">
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
     <h1 className='md:text-2xl  mx-8 my-10'>My Orders</h1>
       <div className=' w-[100vw] mx-5'>
       <div className=" overflow-x-scroll flex md:justify-center">
           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                       <th scope="col" className=" px-6 py-3">
                           #OrderId
                       </th>
                       <th scope="col" className="px-6 py-3">
                          Email
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Price
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Details
                       </th>
                   </tr>
               </thead>
               <tbody>
                    {order.map((item)=>{
                    return <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {item.orderId}
                       </th>
                       <td className="px-6 py-4">
                           {item.email}
                       </td>
                       <td className="px-6 py-4">
                            ₹{item.amount}
                       </td>
                       <td className="px-6 py-4">
                           <Link href={'/order?id=' + item._id}>Details</Link>
                       </td>   
                   </tr>})}
               </tbody>
           </table>
       </div>
       </div>
     </div>
    
  )
}


export default Orders