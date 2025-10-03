const { jwt } = require("jsonwebtoken");
const User=require("../models/user")

const userAuth=async (req,res,next)=>{
    try{
        // Read token from request cookies
        const {token}=req.cookies;
        if(!token){
            throw new Error("Invalid Token!!!!")
        }

        // validate the token
        const decodedObj=await jwt.verify(token,"Aditi@#$%12");
        const {_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        next();  // move to request handler

        // find the user
        req.user=user;  
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }

}

module.export={userAuth};