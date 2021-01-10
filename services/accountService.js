let nodemailer = require('nodemailer');
const { ResetPassword, User, sequelize } = require('../db/sequalize');
const accountConstants = require('../constants/accountServiceConstants');

const forgotPassword = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("[START] forgotPassword Method");

      let user = await User.findOne({         where: {
        email: req.body.email
      } })
      if (!user) {
        //req.flash('error', 'No account with that email address exists.');
        resolve({ 'error': 'No account with that email address exists.' })
      }
      console.log("USER FOUND " + JSON.stringify(user));

      let resetTable = await ResetPassword.findOne({ email: req.body.email });
      console.log('resetTable '+JSON.stringify(resetTable));
      await resetTable.destroy({
        where: {
          email: req.body.email
        }
    })

      let dt = new Date();
      dt.setHours(dt.getHours() + 1)
      let otp = Math.floor(100000 + Math.random() * 900000);
      console.log("otp " + otp + " duration " + dt);
      console.log("Params are "+JSON.stringify({ email: req.body.email, otp: otp, duration: dt }))
      let resetPassword = await ResetPassword.create({ email: req.body.email, otp: otp, duration: dt });


      let smtpTransport = await nodemailer.createTransport({
        //service: 'SendGrid',
        host: accountConstants.host,
        port: accountConstants.port,
        auth: accountConstants.auth
      });

      var mailOptions = {
        to: req.body.email,
        from: process.env.EMAILSENDER,
        subject: accountConstants.subject,
        // text: 'Hello,\n\n' +
        //   'This is a confirmation that the password for your account ' + 'rohanmishra0396@gmail.com' + ' has just been changed.\n'
        text: `Hello,\n\n
              Please use verification code - ${otp} to change your password`
      };
      smtpTransport.sendMail(mailOptions, function (err, info) {
        
        if(info){
          resolve({"message":"Success"});
          console.log("INFO " + JSON.stringify(info));
        }
        else {
          resolve({"message":"Failed"});
          console.log("error " + err.message);
        }
        console.log("[END] forgotPassword Method");
      });

      

    } catch (error) {
      console.log("error occurred " + error.message);
      reject({ "error": error.message })
    }
  });
}

const resetPassword = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("[START] resetPassword service");

      //fetch valid data for update
      let reset = await sequelize.query('select * from reset_passwords where email = (:email) AND otp = (:otp) AND DATE_ADD(duration,INTERVAL 1 HOUR) >= NOW()', {
        replacements: { email: req.body.email, otp: req.body.otp },
        model: ResetPassword,
        mapToModel: true
      });
      console.log("reset " + JSON.stringify(reset));
      // change the password
      if (reset.length > 0) {
        console.log("found valid request to change password");

        //search user table for record
        const user = await User.findOne({

          where: {
            email: req.body.email
          }
        });

        console.log("user found is " + JSON.stringify(user));

        let update = await user.update({
          password: req.body.password,
        },
          { where: { email: req.body.email } }
        );

        console.log("update result " + JSON.stringify(update));
        resolve({ "message": "Success" });
      }
      else {

        resolve({ "message": "no record updated" });
      }
      console.log("[END] resetPassword service");
    } catch (error) {
      console.log("error occurred in resetPassword service " + error.message);
      reject({ error: error.message });
    }
  })
}

module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;