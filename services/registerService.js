const { User, Address } = require('../db/sequalize');
const moment =require('moment');
const register = (req) => {
    let userJson = req.body;
    let validityDate;
    return new Promise(function (resolve, reject) {
        try {
            console.log("userJson"+JSON.stringify(userJson));
            if(userJson.planType === 'Y'){
                validityDate =  moment(new Date()).add(365, 'd').format("YYYY-MM-DD HH:mm:ss");
            }else if (userJson.planType === 'M'){
                validityDate =  moment(new Date()).add(30, 'd').format("YYYY-MM-DD HH:mm:ss");
            }else{
                validityDate =  moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            }

            User.create({
                userName: userJson.name,
                email: userJson.email,
                password: userJson.password,
                phoneNumber: userJson.phoneNumber,
                companyName: userJson.companyName,
                ebayPage: userJson.ebayPage,
                validTill: validityDate
            }).then(function (user) {
                console.log("user"+JSON.stringify(user));
                Address.create({
                    planType: userJson.planType,
                    planAmount: userJson.planAmount,
                    address1: userJson.address1,
                    address2: userJson.address2,
                    city: userJson.city,
                    state: userJson.state,
                    zip: userJson.zip,
                    userId: user.userId
                }).then(function () {
                    resolve({
                        "code": 200,
                        "message": "User details saved successfully"
                    });
                });
            });
        } catch (error) {
            console.log("Error in Register Service");
            reject();
        }

    });
}

const checkEmailExists = (req) => {
    let emailId = req.body.emailId;
    return new Promise(async function (resolve, reject) {
        try {
            const user = await User.findOne({
                where: {
                    email: emailId
                }
            });
            console.log("user"+JSON.stringify(user));
            if(user){
                return resolve({
                    status: 403,
                    message: 'User already exists'
                  })
            }else{
                return resolve({
                    status: 200,
                    message: 'User not found'
                  })
            }
        } catch (error) {
            logger.error("Error in checkEmailExists service"+error);
            reject({
                status: 403,
                message: 'Procssing error occured'
              });
        }
    });
}

module.exports.register = register;
module.exports.checkEmailExists = checkEmailExists;