import React ,{useEffect,useState} from 'react'

import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
function Orders() {
  const router = useRouter();
  const [order, setOrder] = useState([])
  useEffect(()=>{
        const fetchOrder = async()=>{

            const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verify`,{method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: JSON.parse(localStorage.getItem('myadmin')).token})}) 
            let b = await a.json();
            if (b.success) {
                let t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/adminOrder`,{method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: JSON.parse(localStorage.getItem('myadmin')).token})})
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

            else{
                router.push('/admin/login');
            }




            
        }
    
        fetchOrder();
        
    },[]);
  return (
    <ThemeProvider theme={theme}>
    <style jsx global>{`
      footer {
        display: none;
      }
    `}</style>
    <FullLayout>  
     <div className="container  min-h-screen ">
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
     <h1 className='text-2xl  -mx-20 mb-10'>My Orders</h1>
       <div className='w-[100vw] md:w-[80vw]  md:-mx-20' >
       <div className=" overflow-x-scroll flex justify-center">
           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                       <th scope="col" className="px-6 py-3">
                           #OrderId
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Product Name
                       </th>
                       <th scope="col" className="px-6 py-3 ">
                           Address
                       </th>
                       <th scope="col" className="px-6 py-3">
                          Email
                       </th>
                       <th scope="col" className="px-6 py-3">
                          Phone
                       </th>
                       <th scope="col" className="px-6 py-3">
                           Price/Status
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
                           {item.products.name}
                       </td>
                       <td className="px-6 py-4 ">
                            {item.address}{item.city&&", " + item.city}{item.state&&", "+item.state}
                       </td>
                       <td className="px-6 py-4">
                            {item.email}
                       </td>
                       <td className="px-6 py-4">
                            {item.phone}
                       </td>
                       <td className="px-6 py-4">
                            ₹{item.products.price}/{item.status}
                       </td>
                   </tr>})}
               </tbody>
           </table>
       </div>
       </div>
     </div></FullLayout></ThemeProvider>
    
  )
}


export default Orders