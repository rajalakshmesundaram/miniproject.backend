import nodemailer from 'nodemailer'
const mail=(email,randomString)=>{
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajalakshmesundaram@gmail.com",
        pass: "phqhjvsxkiptseje",
      },
    });
    let details = {
      from: "rajalakshmesundaram@gmail.com",
      to: email,
      subject: "login msg",
      html: `<p>Click the following link to reset your password: <a href="http://localhost:3000/resetpassword/${randomString}">Reset Password</a></p>`,
    };
    mailTransporter.sendMail(details,(error)=>{
        if(error){
            console.log("mail not send")
            
        }
        else{
            console.log("mail  send")
        }
    })
    
}
export default mail