const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
  try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    // validation
    const allowedStatus=["ignored","interested"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid status typr"})
    }

    // check if exists in Database

    const toUser=await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message:"User not found"})
    }



    // check if there is an existing ConnectionRequest
    const existingConnectionRequest=await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if(existingConnectionRequest){
      return res.status(400).send({message:"Connection Request already exists"})
    }


    const ConnectionRequest=new ConnectionRequest({
      fromUserId,toUserId,status
    })

    const data=await ConnectionRequest.save();
    res.json({
      message:req.user.firstName+" is "+status+" in "+toUser.firstName,
      data
    });
  }
  catch(err){
    res.status(400).send("ERROR: "+err.message);
  }
})

requestRouter.post("/request/send/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    // validate the status
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status not allowed"})
    } 

    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    })
    if(!connectionRequest){
      return res.status(400).json({message:"Connection request not found"})
    }

    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({message:"Connection request "+status,data})

    
    // check if loggedIn should be same as toUserId
    // check status is intersested

  }
  catch(err){
    res.status(400).send("ERROR: "+err.message);
  }
})

// if field is unique in schema automatically becomes => index 

module.exports=requestRouter;