const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    userId: {type:string,required:true},
    products:[{
        
        productId:{type: String},
        quantity:{type: Number,default:1}
        
    }],
    address:{
        type:string,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    status:{type:string,
    required:true,default:'Pending'}

},{timestamps:true})
mongoose.models={}
export default mongoose.model("Order",OrderSchema);