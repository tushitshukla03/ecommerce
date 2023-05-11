const Razorpay=require('razorpay');
const shortid=require('shortid');
import Order from "@/schema/Order";
import Product from "@/schema/Product";
import connectDb from "@/middleware/mongoose";
import AdminOrder from "@/schema/AdminOrder";

const razorpay = new Razorpay({
     key_id: process.env.NEXT_PUBLIC_key_id,
     key_secret: process.env.NEXT_PUBLIC_key_secret

});



const handler = async (req,res)=>{
    let product,sumTotal=0;
    if(req.body.subTotal<=0){
      res.status(200).json({success:false,"error":"Cart Empty! Please build your cart and try again"});
      return
    }

    for (let items in req.body.cart) {
      sumTotal += req.body.cart[items].price*req.body.cart[items].qty;
      const product = await Product.findOne({slug: items});
      if(product.availableQty<req.body.cart[items].qty){
        res.status(200).json({success:false,"error":"Some items in your cart went out of stocks. Please try again"}) 
        return
      }
      if(product.price!=req.body.cart[items].price){  
        res.status(200).json({success:false,"error":"The price has been changed. Please try again"})
        return
      }
    };

    if(sumTotal!=req.body.subTotal){
      res.status(200).json({success:false,"error":"The price has been changed. Please try again"})
      return 
    }
    if(req.body.phone.length!==10 || Number.isInteger(req.body.phone)){
      res.status(200).json({success:false,"error":"Please enter correct 10 digit phone number"})
      return
    }

    // if(req.body.phone.pincode!==6 || Number.isInteger(req.body.pincode)){
    //   res.status(200).json({success:false,"error":"Please enter correct 6 digit pincode"})
    //   return
    // }
    const oid = shortid.generate()
    
    try{
    const payment_capture=1
    const amount = req.body.subTotal
    const currency = "INR"
    const options = {amount: (amount*100).toString(), currency, receipt: oid,payment_capture}
    const response = await razorpay.orders.create(options);
    let keys=Object.keys(req.body.cart);
    for(let i=0; i<keys.length;i++){
      let adminOrder= new AdminOrder({
        email: req.body.email,
        orderId: response.id,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        name: req.body.name,
        pincode: req.body.pincode,
        amount: req.body.subTotal,
        products: req.body.cart[keys[i]],
        seller: req.body.cart[keys[i]].seller
      })
      await adminOrder.save();
    }
    let order = new Order({
      email: req.body.email,
      orderId: response.id,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      name: req.body.name,
      pincode: req.body.pincode,
      amount: req.body.subTotal,
      products: req.body.cart
    });
    await order.save();
    res.status(200).json(
      {id: response.id,
      currency: response.currency,
      amount: response.amount,
      success: true}
    ) ;}
    catch(err){console.log(err);}}

export default connectDb(handler)