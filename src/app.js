const express=require('express')
const app=express();

app.use('/',(req,res)=>{
    res.send("Hello from server")  // reqhandler
})

app.listen(3000,()=>{
    console.log("server is successfully listenning on 3000")
})

