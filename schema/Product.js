const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    title: {type:String,required:true},
    slug:{type:String,required: true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    category:{
        type:String,required:true
    },
    size:{
        type:String
    },
    color:{type:String},
    price:{type:Number,required:true},
    availableQty:{type:Number,required:true},
    status:{type:String,
    required:true,default:'Pending'},
    seller:{type:String,default:""}  

},{timestamps:true})

mongoose.models={}

export default mongoose.model("Product",ProductSchema);