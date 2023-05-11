const crypto = require('crypto');
import Order from "@/schema/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/schema/Product";
const handler = async (req,res)=>{
    let order;
    const secret = '0987654321'
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256',secret)
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex')
    if(digest === req.headers['x-razorpay-signature']){
        order = await Order.findOneAndUpdate({orderId:req.body.payload.payment.entity.order_id},{status:'PAID',paymentInfo:JSON.stringify(req.body.payload.payment.entity)})
        let products = order.products
        for (let slug in products){
          await Product.findOneAndUpdate({slug:slug}, {$inc: {"availableQty": -products[slug].qty}})
        }
        
    }
    else{
      order = await Order.findOneAndUpdate({orderId:req.body.payload.payment.entity.order_id},{status:'PENDING',paymentInfo:JSON.stringify(req.body.payload.payment.entity)})
        
    }
    res.status(200).json({ status: "ok"})
    
  }


export default connectDb(handler)