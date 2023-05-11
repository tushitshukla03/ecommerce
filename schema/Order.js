const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    email: {type:String,required:true},
    orderId: {type:String,required:true},
    paymentInfo: {type:String,default:''},
    products:{type:Object,required:true},
    address:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type: Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    status:{type:String,
    required:true,default:'Pending'},
    deliveryStatus:{type:String,required:true,default:'pending'},
    amount:{type:String,required:true}

},{timestamps:true})
mongoose.models={}
export default mongoose.model("Order",OrderSchema);