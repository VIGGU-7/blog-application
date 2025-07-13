import nodemailer from 'nodemailer'
import 'dotenv/config'
//use your own mail smtp server
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fcae94330ac2da",
    pass: "1a6bec4a7d4253"
  }
});

export const sendEmail=async(email,token,type)=>{
    const verifyEmail={
        from:"hi@viggu.me",
        to:email,
        subject:"Verify your email !",
        html:`<p>Hello ! please verify your email 
        <a href=${process.env.clientUrl}/verify?token=${token}>Click here</a> 
        if you are unable to click copy this and paste ${process.env.clientUrl}/verify?token=${token}</p>`
    }
    const forgotPassEmail={
        from:"hi@viggu.me",
        to:email,
        subject:"Forgot Password",
        html:`<p>Hello ! please click on the link to reset your password
        <a href=${process.env.clientUrl}/reset?token=${token}>Click here</a> 
        if you are unable to click copy this and paste ${process.env.clientUrl}/reset?token=${token}</p>`
    }
    transport.sendMail((type==="verify")?verifyEmail:forgotPassEmail,(error,info)=>{
        if (error) {
      return console.log('Error sending welcome email:', error);
    }
    console.log('email sent', info.response);
    })

}
