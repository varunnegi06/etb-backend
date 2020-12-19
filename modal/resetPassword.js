const bcrypt = require("bcrypt");

module.exports = (sequelize, type) => {
  let resetPassword = sequelize.define('reset_passwords', {
    resetId: {
      type: type.INTEGER,
      field: 'reset_id',
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: type.STRING,
      field: 'email'
    }
    ,
    otp: {
        type: type.INTEGER,
        field: 'otp'
      },

      duration: {
        type: 'TIMESTAMP',
        // type: type.VIRTUAL(type.TIMESTAMP,
        //     [type.literal(`(select DATE_ADD(NOW(),INTERVAL 1 HOUR) from dual) as "futureDate"`), "futureDate"]),
      
          field: 'duration'
      },

    updatedAt: {
      type: 'TIMESTAMP',
      field: 'last_updated',
      defaultValue: type.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false
  })

  resetPassword.prototype.createOtp = () => {
    let dt = new Date();
    dt.setHours( dt.getHours() + 1 )
    let otp = Math.floor(100000 + Math.random() * 900000);
    return ({otp:otp,date:dt});
  }


  return resetPassword;
}



