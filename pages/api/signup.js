import User from "@/schema/User";

import connectDb from "@/middleware/mongoose";
var CryptoJs = require("crypto-js");

const handler = async (req,res)=>{
   
    if(req.method=="POST"){
        
        const {name,email} = req.body
        console.log(email);
        const u = await User.findOne({"email":email})
        console.log(u);
        if(u){
            res.status(400).json({success:false, message:"User already exists"})
        }
        let user = new User({name,email,password:CryptoJs.AES.encrypt(req.body.password,process.env.NEXT_PUBLIC_salt).toString()})   
        await user.save();
        res.status(200).json({success:true , msg:"success"});

    }
    else{
        res.status(400).json({success:false,error:"This method is not allowed"})
    }
    
}


export default connectDb(handler)