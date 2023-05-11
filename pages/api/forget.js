import User from "@/schema/User";
import nodemailer from "nodemailer";
var fs = require('fs');
import handlebars from "handlebars";
import connectDb from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");
var CryptoJs = require("crypto-js");
const handler = async (req, res) => {
  try {
    let db = await User.findOne({ email: req.body.email });
    const secret = "jwt_secret_1" + db.password;
    const payload = {
      email: req.body.email,
      id: db._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `${process.env.NEXT_PUBLIC_HOST}/forget?id=${db._id}&token=${token}`;


  
  const source = fs.readFileSync('email/email.html', 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
      link: link
  };
  const htmlToSend = template(replacements);
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MAIL_USER_EMAIL,
      to: db.email,
      subject: "Reset Password",
      html: htmlToSend
    }; 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USER_EMAIL,
        pass: process.env.NEXT_PUBLIC_MAIL_USER_PASSWORD
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    res.status(400).json({ success: false , error: err.message });
  }
};

export default connectDb(handler);
