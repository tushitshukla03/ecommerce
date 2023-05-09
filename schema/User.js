const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    Name: {type:string,required:true},
    email:{type:String,required: true,unique:true},
    password:{type:String,required:true}

},{timestamps:true})
mongoose.models={}                                  
export default mongoose.model("User",UserSchema);