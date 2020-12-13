const { User} = require('../db/sequalize');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const login = (req) => {

    return new Promise (async(resolve,reject) => {

        try {
            // Grab user input
            const { userName, password } = req.body
            
            const user = await User.findOne({

              where : {
                [Op.or]: [
                  { email: userName },
                  { userName: userName }
                ]
              }
            });
            console.log("user record found is "+JSON.stringify(user));
            console.log("generate hash "+await user.generateHash(password));
            // Check to see if user is in db
            if (!user) {
            //   res.status(403).send({
            //     error: 'the login information was incorrect / Not Found'
            //   })
            return resolve({
                    status: 403,
                    error: 'the login information was incorrect / Not Found'
                  })
            }

            // Check to see if password is valid
            const isPasswordValid = await user.validPassword(password,user.password);
            console.log("isPasswordValid "+isPasswordValid+" "+user.password);
            if (!isPasswordValid) {
                return resolve({
                    status: 403,
                    error: 'the login information was incorrect / Not Found'
                  })
            }
            // return user using toJSON()
            const userJson = user.toJSON()

            const  expiresIn  =  24  *  60  *  60;
            const SECRET_KEY = `T003bhyr)656583**`;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });

            delete userJson.userId;
            delete userJson.password;
            delete userJson.updatedAt;

            resolve({
              user: userJson,
              token: accessToken
            })
          } catch (e) {
            console.log(e)
            reject({ error: 'An error occured attempting to login' })
            
          }
    });
}


module.exports.login = login;