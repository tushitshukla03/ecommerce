import React ,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Myaccount({user1}){

    const router = useRouter();
    const [name,setName] = useState()
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone]=useState('');
    const [pincode,setPincode] = useState('');
    const [address,setAddress]= useState('');
    const [password, setPassword] = useState('');
    const [npassword, setNpassword] = useState('');
    
    const [confirmPassword, setConfirmPassword] = useState('');



    const handleChange= async(e)=>{
  
      if(e.target.name=="name1"){
        setName(e.target.value);
      }
      else if(e.target.name=="phone"){
      setPhone(e.target.value);
    }
      else if(e.target.name=="address"){
        setAddress(e.target.value);
      }
      else if(e.target.name=="pincode"){
        setPincode(e.target.value);
      }
      else if(e.target.name=="password"){
        setPassword(e.target.value);
      }
      else if(e.target.name=="npassword"){
        setNpassword(e.target.value);
      }
      else if(e.target.name=="confirmPassword"){
        setConfirmPassword(e.target.value);
      }
    }



    useEffect(()=>{
    
      const myuser = JSON.parse(localStorage.getItem('myuser'));
        if(!myuser){
            router.push('/')
        }
        if(myuser && myuser.token){
          setUser(myuser);
          setEmail(myuser.email);

        }
        handleUserSubmit(myuser.token);
    },[]);



    const handleUserSubmit = async(token)=>{
      const body = {token : token}
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getInfo`, requestOptions);
      let response = await res.json();
      if(response.success){
        setName(response.name);
        setAddress(response.address);
        setPhone(response.phone);
        setPincode(response.pincode);
    
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



    const handleUserUpdate = async()=>{
      const body = {token : user.token, name, address ,phone,pincode}
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, requestOptions);
      let response = await res.json();
      
        if(response.success){
          toast.success("User Profile Updated", {
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
    const handlePasswordSubmit = async()=>{
      const body = {token : user.token, password , npassword, confirmPassword}
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, requestOptions);
      let response = await res.json();
      
      if(response.success){
        
        toast.success("User Password Updated", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        setPassword('')
        setNpassword('')
        setConfirmPassword('')
      }

      else{
        toast.error("Error while Updating", {
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
    <>
<section className=" py-1 bg-blueGray-50">
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
<div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
      <div className="text-center flex justify-between">
        <h6 className="text-blueGray-700 text-xl font-bold">
          My account
        </h6>
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="name1">
                Username
              </label>
              <input name="name1" onChange={handleChange} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={name}/>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                Email address
              </label>
              <input value={email}  type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" readOnly={true}/>
            </div>
          </div>
        </div>
        <hr className="mt-6 border-b-1 border-blueGray-300 mb-8"/>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Contact Information
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="address">
                Address
              </label>
              <input type="text" onChange={handleChange} name="address" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={address}/>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="phone">
                Phone
              </label>
              <input type="text" onChange={handleChange} name="phone" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={phone}/>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="pincode">
                Pin Code
              </label>
              <input onChange={handleChange} type="text" name="pincode" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={pincode}/>
            </div>
            
          </div>
        </div>
        <button onClick={handleUserUpdate} className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 mx-3 my-5 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
          Update Profile
        </button>
        <hr className="mt-6 border-b-1 border-blueGray-300"/>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Change Password
        </h6>
        <div className="flex flex-wrap">
         <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="password">
            Password
              </label>
              <input onChange={handleChange} type="password" name="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={password}/>
          </div>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="npassword">
            New Password
              </label>
              <input onChange={handleChange} type="password" name="npassword" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={npassword}/>
          </div>
          <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="confirmPassword">
                Confirm New Password
              </label>
              <input onChange={handleChange} type="password" name="confirmPassword" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={confirmPassword}/>
          </div>
          <button onClick={handlePasswordSubmit} className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2  my-5 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
           Change Password
        </button>
        </div>
      </form>
    </div>
  </div>
</div>
</section>
    </>
  )
}


export default Myaccount