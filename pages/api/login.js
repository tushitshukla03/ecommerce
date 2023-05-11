import User from "@/schema/User";

import connectDb from "@/middleware/mongoose";
var CryptoJs = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{
    
    if(req.method=="POST"){
      
        let user = await User.findOne({"email":req.body.email});
        console.log(user.password);
        if(!user){
            res.status(404).json({success:false, error:"User not found"});
        }
        const bytes = CryptoJs.AES.decrypt(user.password,process.env.NEXT_PUBLIC_salt);
        console.log(bytes.toString(CryptoJs.enc.Utf8),"dfed");
    
        var decrypted = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
        console.log(decrypted);
    
        if(user){
             if(req.body.email==user.email && req.body.password==decrypted){
            var token = jwt.sign({name:user.name,email:user.email}, process.env.NEXT_PUBLIC_JSONWEBTOKEN,{expiresIn:"2d"});
            res.status(200).json({success:true,token, email:user.email});
        }
        else{res.status(200).json({success:false ,error:"Invalid credentials"});
    }
        }
    }
    else{
        res.status(400).json({error:"This method is not allowed"})
    }
    
}


export default connectDb(handler)