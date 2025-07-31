const express=require('express')
const app=express();

// order is very imp  => as i only ('/) is used as the first route then 
// all other will give same output as of it , (SO USE '/' AT THE LAST) 

//  if /hello ans /hello/2   (then first use /hello/2  (to use it effectively) )

app.use('/hello',(req,res)=>{
    res.send("Hello hello")  // reqhandler
})
app.get('/user',(req,res)=>{
    res.send({firstname:"aditi",lastnmae:"sharma"})
})

app.post('/user',(req,res)=>{
    res.send("data saved successfully")
})
app.use('/',(req,res)=>{
    res.send("Hello from server")  // reqhandler
})

app.listen(3000,()=>{
    console.log("server is successfully listenning on 3000")
})

/////////////  HTTP METHODS (get,post,put, delete)

