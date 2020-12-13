const { User, Address } = require('../db/sequalize');

const register = (req) => {
    let userJson = req.body;
    return new Promise(function (resolve, reject) {
        try {
            User.create({
                user_name: userJson.userName,
                email: userJson.email,
                password: userJson.password,
                companyName: userJson.companyName,
                ebayPage: userJson.ebayPage,
            }).then(function (user) {
                Address.create({
                    planType: userJson.planType,
                    planAmount: userJson.planAmount,
                    address1: userJson.address1,
                    address2: userJson.address2,
                    city: userJson.city,
                    state: userJson.state,
                    zip: userJson.zip,
                    cardNumber: userJson.cardNumber,
                    cvv: userJson.cvv,
                    exp_date: userJson.expDate,
                    user_id: user.user_id
                }).then(function () {
                    resolve({
                        "code": 200,
                        "message": "User details saved successfully"
                    });
                });
            });
        } catch (error) {
            console.log("Error in ");
            reject();
        }

    });
}

module.exports.register = register;