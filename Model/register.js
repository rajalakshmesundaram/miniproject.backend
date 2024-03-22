import mongoose from "mongoose";
const registerSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    randomString:String,
})
const Register=mongoose.model('register',registerSchema)
export default Register