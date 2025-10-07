const mongoose=require("mongoose")

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" ,   // fromUserId is reference to User collection  
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status typ`
        }
    }
},{timestamps:true}
)

// Compomound Index  (makes fast ACCESS)
connectionRequestSchema.index({fromUserId:1,toUserId:1})



// call when to pre-save 
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    // check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
})

const connectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports=connectionRequestModel