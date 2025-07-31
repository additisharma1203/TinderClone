const adminAuth=(req,res,next)=>{
    console.log("Admin auth is started");
    const token="xyz";
    const isAdmin=token==='xyz';
    if(!isAdmin){
        res.status(401).send("Uthorized request")
    }else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    console.log("USER auth is started");
    const token="xyz";
    const isAdmin=token==='xyz';
    if(!isAdmin){
        res.status(401).send("Uthorized request")
    }else{
        next();
    }
}

module.exports={adminAuth,userAuth};