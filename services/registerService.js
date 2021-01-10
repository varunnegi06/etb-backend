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

module.exports.register = register;