let nodemailer = require('nodemailer');
const JSONTransport = require('nodemailer/lib/json-transport');
const { ResetPassword } = require('../db/sequalize');
const { User } = require('../db/sequalize');
const { Op } = require('sequelize')

const forgotPassword = (req) => {
    return new Promise ( async (resolve, reject) => {
        try {
            console.log("[START] forgotPassword Method");

            let user = await User.findOne({ email: req.body.email })
                if (!user) {
                  //req.flash('error', 'No account with that email address exists.');
                  resolve({'error': 'No account with that email address exists.'})
                }
                console.log("USER FOUND "+JSON.stringify(user));
                let dt = new Date();
    dt.setHours( dt.getHours() + 1 )
    let otp = Math.floor(100000 + Math.random() * 900000);
    console.log("otp "+otp+" duration "+dt);
         let resetPassword = await ResetPassword.create({email: req.body.email , otp: otp, duration : dt});
//return resolve(resetPassword);
                // model.findAll({
                //   where: {
                //     start_datetime: {
                //       [Op.lte]: moment().subtract(7, 'days').toDate()
                //     }
                //   }
                // })


            let smtpTransport = await nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                  user: 'rohanmishra0396@gmail.com',
                  pass: 'Godhand@12345678'
                }
              });

              var mailOptions = {
                to: 'rohanmishra0396@gmail.com',
                from: 'rohanmishra0396@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                  'This is a confirmation that the password for your account ' + 'rohanmishra0396@gmail.com' + ' has just been changed.\n'
              };
              smtpTransport.sendMail(mailOptions, function(err,info) {
                //req.flash('success', 'Success! Your password has been changed.');
                console.log("INFO "+JSON.stringify(info));
                console.log("error "+err.message);
                //done(err);
                resolve();
              });

            console.log("[END] forgotPassword Method");
            
        } catch (error) {
            console.log("error occurred "+error.message);
            reject({"error":error.message})
        }
    });
}

module.exports.forgotPassword = forgotPassword;