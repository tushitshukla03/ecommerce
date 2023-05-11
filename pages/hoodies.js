import Link from 'next/link'
import React,{useState} from 'react'
import Product from "@/schema/Product"; 
import mongoose from 'mongoose';


function Hoodies({products}) {
  // console.log(products)
  const [avaiColor, setAvaiColor]= useState(["white","red","black","pink","yellow","green","blue","purple","brown",'peach','orange','gray'])
  return (
    <div >
    <section className="text-gray-600  body-font ">
  <div className="container px-10 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
        {Object.keys(products).length===0 &&<p>All hoodies are currently out of stocks.New Stocks coming soon!</p>}
        {Object.keys(products).map((item)=>{return<Link key={products[item]._id} href={`/product/${products[item].slug}`} className="ml-9">
        <div className="p-6 w-[80vw] md:w-[18vw] shadow-lg my-5"><div className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="px-10 md:h-[30vh] md:w-[13.5vw] block" src={products[item].img}/>
        </div>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">DamnGood</h3>
         <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
          <p className="mt-1">₹{products[item].price}</p>
          <div className="mt-1">
          {products[item].size.includes('s') && <span className='border border-gray-300 px-1 mr-1'>S </span>} 
          {products[item].size.includes('m') && <span className='border border-gray-300 px-1 mr-1'>M </span>} 
          {products[item].size.includes('l') && <span className='border border-gray-300 px-1 mr-1'>L </span> }
          {products[item].size.includes('xl') && <span className='border border-gray-300 px-1 mr-1'>XL </span>}</div>
          <div className="mt-2">
          {avaiColor.map((col)=>{return products[item].color.includes(col) && <button className='border-2 border-gray-300 p-1 mr-1 rounded-full w-6 h-6 focus:outline-none' style={{backgroundColor:`${col}`}}></button>})}</div>
        </div></div></Link>})}
      </div>
      
      
    
  </div>
</section></div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI); 
}

let products = await Product.find({category:"hoodies"});
let hoods = {}
  for(let item of products){
        if(item.title in hoods){
            if(!hoods[item.title].color.includes(item.color) && item.availableQty>0){
                hoods[item.title].color.push(item.color)}
            if(!hoods[item.title].size.includes(item.size) && item.availableQty>0){
                    hoods[item.title].size.push(item.size)}

        }else{
            hoods[item.title]=JSON.parse(JSON.stringify(item))
                if(item.availableQty>0){
                    hoods[item.title].color=[item.color]
                    hoods[item.title].size=[item.size]

                }
            
        }
    }

  
  return {
    props: {products: JSON.parse(JSON.stringify(hoods))}, // will be passed to the page component as props
  }
} 
export default Hoodies