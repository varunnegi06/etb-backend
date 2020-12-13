
module.exports = (sequelize, type) => {
  let address = sequelize.define('address', {
    addressId: {
      type: type.INTEGER,
      field: 'user_id',
      primaryKey: true,
      autoIncrement: true
    },
    planType: {
      type: type.STRING,
      field: 'plan_type'
    },
    planAmount: {
      type: type.STRING,
      field: 'plan_amount'
    },
    address1: {
      type: type.STRING,
      field: 'address1'
    },
    address2: {
      type: type.STRING,
      field: 'address2'
    },
    city: {
      type: type.STRING,
      field: 'city'
    },
    state: {
      type: type.STRING,
      field: 'state'
    },
    city: {
      type: type.STRING,
      field: 'city'
    },
    zip: {
      type: type.STRING,
      field: 'zip'
    },
    cardNumber: {
      type: type.STRING,
      field: 'card_number'
    },
    cvv: {
      type: type.STRING,
      field: 'cvv'
    },
    expDate: {
      type: type.STRING,
      field: 'exp_date'
    },
    userId:{
      type: type.STRING,
      field: 'user_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })

  return address;
}



