const express=require("express")
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")

const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills";

// get all pending connection request for loggedIn user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA) // both same
        // }).populate("fromUserId",["firstName","lastName"]);   // filter 

        // ref and populate => acts a join

        res.json({
            message:"Data fetched successfully ",
            data:connectionRequests
        })
 
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})


userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"}, 
                {fromUserId:loggedInUser._id,status:"accepted"}
            ],
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        const data=connectionRequests.map((row)=> {
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({data});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

///************/
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        // user should see all user cards except 
        // - his own card
        // - his connections
        // - ignored people
        // - already sent connection request

        const loggedInUser=req.user;

        // pagination
        const page=parseInt(req.params.page) || 1;
        let limit=parseInt(req.params.limit) || 10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;

        // find all connection req sent+receieved
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId").skip(skip).limit(limit);

        const hideUsersFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users=await User.find({
            $and:[
               {_id:{$nin:Array.from(hideUsersFromFeed)}}, // nin => not in array
                {_id:{$ne: loggedInUser._id}}  // ne => not equal
            ]
        }).select(USER_SAFE_DATA)
        res.send(users)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports=userRouter;

///////////  PAGINATION /////////
//  /feed?page=1&limit=10 => first 10 users 1-10
//  /feed?page=2&limit=10 => 11-20
// .skip(0)  & .limit(10)  => 1-10
// .skip(20) & .limit(10)  => 21-30
//  SKIP==> (page-1)*limit ****************