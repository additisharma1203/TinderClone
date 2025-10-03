const express=require('express')
const app=express();
const connectDb=require("./config/database")
app.use(express.json())
const cookieParser=require("cookie-parser")// to read a cookie
app.use(cookieParser())
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)



// order is very imp  => as i only ('/) is used as the first route then 
// all other will give same output as of it , (SO USE '/' AT THE LAST) 
//  if /hello ans /hello/2   (then first use /hello/2  (to use it effectively) )

// ? (optional)   ab?c = ac
// + (abbbbbbbbbbbbbc)   ab+c      abaditisharmac
// *....$  (anything in between works)
// id=1&name=aditi (req.query)
// /user/:userid/:name  (req.params)

// MIDDLEWRE
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


// Create a model
// const User = mongoose.model('User', UserSchema);
// Test route
// app.get('/testdb', async (req, res) => {
//   try {
//     // Insert one user
//     const newUser = await User.create({ name: "Aditi", email: "aditi@example.com" });

//     // Fetch all users
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// get user by email
// app.get("/user",async(req,res)=>{
//   const userEmail=req.body.emailId;
//   try{
//     const users=await User.find({emailId:userEmail}) // return all with this id in array form
//     const userOne=await User.findOne({emailId:userEmail}) // returns only one in{}
//     if(users.length===0){
//       res.status(404).send("User not found")
//     }else{
//       res.send(users);
//     }
//   }
//   catch(err){
//     res.status(400).send("Something went wrong")
//   }
  
// })




// findOne and findId is same

connectDb().then(()=>{
    console.log("Databse connection is established")
    app.listen(3000,()=>{
    console.log("server is successfully listenning on 3000")
})
}).catch((err)=>{
    console.log("Database cannot be connected");
})



/////////////  Authentication
///  Login=> Authentication
// Cookies => server sends back cookie which contains jwt token
//  *** Whenever a user is logged in , server will create a TOKEN attached with COOKIE ans send back,
//  now the cookie is stored by browser , whenever another request is made,
// it is sent along and VALIDATED there

///////  JWT (JSON WEB TOKEN)
// very unique token and had a secret info embedded inside into it 
// can contain special token inside it
// HEADER => red
// PAYLOAD => pink => secret data which is inside the token
// SIGNATURE => blue  => jwt uses to check whether if token is actual or not
// npm i jsonwebtoken => gives way of signing and verifying a token
// SIGN => creates a TOKEN
// VERIFY => verifies a token


