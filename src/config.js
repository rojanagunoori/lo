const mongoose=require("mongoose")
const url="mongodb+srv://nikhil2:nikhil2@cluster0.d0n5ecj.mongodb.net/?retryWrites=true"
const connect=mongoose.connect(url)

connect.then(()=>{
    console.log("Database connected succesfully")
})
.catch(()=>{
    console.log("Database cannot be connected")
})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("users",LoginSchema);

module.exports=collection