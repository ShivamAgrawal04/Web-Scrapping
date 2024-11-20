import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

function sendMail(to, sub, msg) {
  transporter.sendMail({
    to: to,
    sub: sub,
    text: "hello",
    html: msg,
  });
}

sendMail("deltaapnacollege03@gmail.com", "456789", "rishika");
