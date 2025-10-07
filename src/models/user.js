//// creating schema
const validator=require("validator");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");


const userSchema=new mongoose.Schema(  //defines user
    {
        firstName:{
            type:String,
            required:true,
            minLength:4,
            maxLength:50
        },
        lastName:{
            type:String
        },
        emailId:{
            type:String,
            required:true ,
            unique:true,  // index
            lowercase:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address"+value)
                }
            }
        },
        password:{
            type:String,
            required:true 

        },
        age:{
            type:String,
            min:18,
        },
        gender:{
            type:String,
            enum:{
                values:["male","female","other"],
                message:`{VALUE} is not a valid gender type`
            },
            // validate(value){
            //     if(!["male","female","others"].includes(value)){
            //         throw new Error("Gender is data is not valid")
            //     }
            // }
        },
        photoUrl:{
            type:String,
            validate(value){
                if(!validator.is(value)){
                    throw new Error("Invalid email address"+value)
                }
            }
        },
        about:{
            type:String,
            default:"This is a default about"
        },
        skills:{
            type:[String]
        }
    },
    {
        timestamps:true,    // createdAt , updatedAt
    }
)

// THIS does not work with ARROW function
userSchema.methods.getJWT=async function(){
    const user=this;
     const token=await jwt.sign({_id:user._id},"Aditi@#$%12",{
            expiresIn:"7d",
     });
     return token;
}

// USERSCHEMA TO VALIDATE THE PASSWORD
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user =this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);  // order matters in comparsion
    return isPasswordValid;

}

module.exports=mongoose.model("User",userSchema);