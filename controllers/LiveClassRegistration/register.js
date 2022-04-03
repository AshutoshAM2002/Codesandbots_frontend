const express = require("express");
const nodemailer = require("nodemailer");
const registerModel = require("./registerModel");
const _ = require("lodash");

const router = express.Router();

const transporter = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    // port: 2525,
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    } 
});

router.post("/student/register", async (req, res) => {
    const register = await new registerModel({
        fullname: _.startCase(_.camelCase(req.body.fullname)),
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        courseName: req.body.courseName
    });
    await register.save().then((data) => {
        // res.status(200).json(data);
        var mailOptions={
            // COMAPNY's Email Address
            from: process.env.SENDER_EMAIL,
            to: data.email,
           subject: "Registration Successful!",
           html: `<h1>Greetings, ${data.fullname}</h1> <br><h2>Thanks for registering to the course from CAB.</h2><br /><p>You have chosen the course:  <b>${data.courseName}</b> </p>` // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.response);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));  
        });
    }).then(() => {
        res.status(200).json({
            "message": "User is registered and the mail has been sent"
        })
    });
})

module.exports = router;