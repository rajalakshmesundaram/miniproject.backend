import Register from "../Model/register.js";
import bcrypt from 'bcryptjs'
import mail from "../Service/nodemail.js"

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword= await bcrypt.hash(password,10)
    const userRegister = new Register({username,email,password:hashpassword});
    await userRegister.save();
    console.log(userRegister);
    res.status(200).json({ message: "user Register created sucessfully", user: userRegister });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};
export const loginUser=async(req,res)=>{
try {
  const{email,password}=req.body;
  const userLogin=await Register.findOne({email})
  if(!userLogin){
   return  res.status(401).json({message: 'user not found'})
  }
    const passwordMatch=await bcrypt.compare(password,userLogin.password)
    if(!passwordMatch){
     return res.status(401).json({message:"invalid password"})
    }
    
    res.status(200).json({message:"login successful"})
  
} catch (error) {
  res.status(500).json({errormessage:"internal server error"})
}
}
export const forgotPassword=async(req,res)=>{
  const { email } = req.body;
const user = await Register.findOne({ email });
if (!user) {
  return res.status(404).json({ message: "User not found" });
}
 const randomString = Math.random().toString(36).slice(2);
 user.randomString=randomString
 await user.save()
  mail(email,randomString)
}
// Endpoint to handle password reset
export const resetpassword = async (req, res) => {
    const { randomString, newPassword } = req.body;

    // Find user by reset token
    const user = await Register.findOne({ randomString: randomString });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Update user's password and clear reset token
    user.password = newPassword;
    user.randomString = null;
   
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
}
