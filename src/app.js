const express=require('express')
const app=express();
const {adminAuth,userAuth}=require('./middlewares/auth')

// order is very imp  => as i only ('/) is used as the first route then 
// all other will give same output as of it , (SO USE '/' AT THE LAST) 

//  if /hello ans /hello/2   (then first use /hello/2  (to use it effectively) )

// app.use('/hello',(req,res)=>{
//     res.send("Hello hello")  // reqhandler
// })
// app.get('/ab?c',(req,res)=>{
//     res.send({firstname:"aditi",lastnmae:"sharma"})
// })
// ? (optional)   ab?c = ac
// + (abbbbbbbbbbbbbc)   ab+c      abaditisharmac
// *....$  (anything in between works)
// id=1&name=aditi (req.query)
// /user/:userid/:name  (req.params)

// app.post('/user',(req,res)=>{
//     res.send("data saved successfully")
// })
// app.use('/',(req,res)=>{
//     res.send("Hello from server")  // reqhandler
// })

// app.listen(3000,()=>{
//     console.log("server is successfully listenning on 3000")
// })

/////////////  HTTP METHODS (get,post,put, delete)


app.use('/admin',adminAuth)
app.get('/user',userAuth,(req,res)=>{
    res.send("User data sent")
})
app.get('/admin/getAllData',(req,res)=>{
    res.send("All Data Sent")
})
app.get('/admin/deleteUser',(req,res)=>{
    res.send("Deleted a user")
})

// app.use('/user',(req,res,next)=>{
//     console.log("handling route 1")
//     // res.send("Response 1")
//     next();
//     //res.send("Response 1") (ERROR)(after next it will not work)
// },(req,res,next)=>{
//     console.log("handling route 2")
//      res.send("Response 2")
//     //  next()  => no route after this (ERROR)
// })

// app.use("/route",[rh1,rh2],rh3,rh4) (valid) (all in array (valid), without array(valid))

// GET /users =>middleware chain =>request handler

app.listen(3000,()=>{
    console.log("server is successfully listenning on 3000")
})

