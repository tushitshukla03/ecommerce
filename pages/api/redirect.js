import Order from "@/schema/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/schema/Product";
const handler = async (req,res)=>{
    const order = await Order.findOne({orderId:req.body.id});
    res.json({url:`${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}&clearCart=1`});      
  }
  
export default connectDb(handler)