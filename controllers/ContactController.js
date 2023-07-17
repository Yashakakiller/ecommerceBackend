const { Contact } = require("../database/models/ContactModel")
const nodemailer = require("nodemailer");



const getContactRequest = async(req,res) =>{
    try {
        const {name , email ,message} = await req.body;
    const personContact = await Contact.create({
        name,
        email,
        message
    })

    const mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:process.env.ADMIN_EMAIL_ADDRESS,
          pass:process.env.SMTP_GMAIL_PASSWORD
        }
      })


    const details = {
        from:process.env.ADMIN_EMAIL_ADDRESS,
        to:email,
        subject:"We have got your Response",
        html:`<h1>Hello ${name}</h1><br /> <p>Your message is : ${message}</p> <br/><hr/><h3>We Will Contact You As Soon As Possible</h3>`
    }  


    const info = mailTransporter.sendMail(details, (err)=>{
        if(err){
          console.log("The error is : " + err.message)
        }else{
          console.log("Message is sent ");
        }
      })
    res.json({success:true,personContact,info})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

module.exports= {
    getContactRequest
}