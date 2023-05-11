import connectDb from "@/middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken';

const handler = async (req,res)=>{
    if(req.method=="POST"){
        try{
        let token = req.body.token 
        let user = jsonwebtoken.verify(token,process.env.NEXT_PUBLIC_JSONWEBTOKEN);
        res.status(200).json({success:true});}catch(err){ res.status(400).json({success:false,error:err.message})}
  }
    else{
        res.status(400).json({success:false,error:"error"})
    }

    
}


export default connectDb(handler)