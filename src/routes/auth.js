const express=require("express")
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation")
const User=require("../models/user");
const bcrypt=require("bcrypt")


// app.use()  => same as => router.use()
authRouter.post("/signup",async (req,res)=>{
  try{
    // validate of data
    validateSignUpData(req);
    const {password}=req.body;
    // Encrypt data   (bcrypt)
    const passwordHash=bcrypt.hash(password,10)

    //creating new instance of User model   ( __v => version)
    const user=new User({
      firstName,
      lastName,
      email,
      password
    }); 
    await user.save();  //saving resposnse
    res.send("User Added Successfully")
    
  }catch(err){
    res.send(400).send("ERROR: "+err.message);
  }
})

authRouter.post("/login",async (req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid=await user.validatePassword();
    if(isPasswordValid){
      // Create a JWT Token   //  (hidden data,secret key)
      const token=await user.getJWT();
      console.log(token);

      // Add the token to cookie and send the response back to th user
      res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
      res.send("Login Successful !!")

    }else{
      throw new Error("Password is not correct")
    }
  }
  catch(err){
    res.status(400).send("ERROR : "+err.message);
  }
})

module.exports=authRouter;
