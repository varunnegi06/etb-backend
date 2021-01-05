const Client = require('square').Client;
const uuid = require('uuid');

console.log(process.env.ENVIRONMENTNAME+process.env.ACCESSTOKEN);
const client = new Client({
    environment: process.env.ENVIRONMENTNAME,
    accessToken: process.env.ACCESSTOKEN,
});

const processPayment = (req) => {

    return new Promise(async function(resolve, reject){
        const requestParams = req.body;

        // Charge the customer's card
        const paymentsApi = client.paymentsApi;
        const requestBody = {
            sourceId: requestParams.nonce,
            amountMoney: {
                amount: requestParams.amount, // multiples of 100
                currency: 'USD'
            },
            locationId: process.env.LOCATIONID,
            idempotencyKey: uuid.v4(),
        };

        try {

            const response = await paymentsApi.createPayment(requestBody);
            resolve({
                'status': 200,
                'title': 'Payment Successful',
                'result': response.result
            });
        } catch (error) {
            console.log("error"+JSON.stringify(error));
            resolve({
                'status': 500,
                'title': 'Payment Failure',
                'result': error
            });
        }
    });
};

module.exports.processPayment = processPayment;