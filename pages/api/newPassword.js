import User from "@/schema/User";

import connectDb from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");
var CryptoJs = require("crypto-js");
const handler = async (req,res)=>{
    if(req.method=="POST"){
        try{let db = await User.findById(req.body.id);
        
        if(!db){
            res.status(400).json({error: "User not found"});
        }

        const secret = "jwt_secret_1" + db.password;
        const payload =  jwt.verify(req.body.token, secret);
        if(req.body.password==req.body.confirmPassword){ 

        const db1 = await User.findOneAndUpdate({email: payload.email},{password:CryptoJs.AES.encrypt(req.body.password,process.env.NEXT_PUBLIC_JSONWEBTOKEN).toString()})
        res.status(200).json({success:true})
        return}}
        catch(err){res.status(400).json({success:false,error:err.message})}
        }
    else{
        res.status(400).json({success:false,error:"error"})
    }

    
}


export default connectDb(handler)