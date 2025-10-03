const mongoose=require('mongoose');
const connectDb=async()=>{
    await mongoose.connect(
    "mongodb+srv://additisharma1447:18fixYuYkcjTLrxd@namastenode.zaswfze.mongodb.net/dev"
)
}

module.exports=connectDb;