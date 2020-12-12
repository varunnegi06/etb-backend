const bcrypt = require("bcrypt");

module.exports = (sequelize, type) => {
    return sequelize.define('user_details', {
        userId: {
          type: type.INTEGER,
          field: 'user_id',
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
            type:type.STRING,
            field: 'user_name'
        } ,
        password: type.STRING,
        updatedAt: {
            type: 'TIMESTAMP',
            field: 'last_updated',
            defaultValue: type.literal('CURRENT_TIMESTAMP')
          },
          createdAt: {
            type: 'TIMESTAMP',
            field: 'created_at',
            defaultValue: type.literal('CURRENT_TIMESTAMP')
          }
    },{
        timestamps: false,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            }
            // ,
            // validPassword(password) {
            //     return bcrypt.compare(password, this.password);
            // }
        }
    })
}