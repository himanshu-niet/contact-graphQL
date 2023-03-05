const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
})



const contactSchema=new mongoose.Schema({
    userId:String,
    firstName:String,
    lastName:String,
    phone:String,
    email:String
})


const User=mongoose.model("User",userSchema);
const Contact=mongoose.model("Contact",contactSchema);


module.exports={
    User,
    Contact
}