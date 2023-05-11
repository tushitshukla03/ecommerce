import User from "@/schema/User";

import connectDb from "@/middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken';
var CryptoJs = require("crypto-js");
const handler = async (req,res)=>{
    if(req.method=="POST"){
        try{let token = req.body.token 
        let user = jsonwebtoken.verify(token,process.env.NEXT_PUBLIC_JSONWEBTOKEN);
        let db = await User.findOne({email:user.email});
        const bytes = CryptoJs.AES.decrypt(db.password,NEXT_PUBLIC_salt);
        var decrypted = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
        
        if(decrypted==req.body.password && req.body.npassword==req.body.confirmPassword){      
        const db = await User.findOneAndUpdate({email: user.email},{password:CryptoJs.AES.encrypt(req.body.npassword,process.env.NEXT_PUBLIC_salt).toString()})
        res.status(200).json({success:true})
        return}} catch(err){res.status(400).json({success:false,error:err.message})
        }}
    else{
        res.status(400).json({success:false,error:"error"})
    }

    
}


export default connectDb(handler)