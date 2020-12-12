const Sequelize = require('sequelize')
const UserModel = require('../modal/user')
// const BlogModel = require('./models/blog')
// const TagModel = require('./models/tag')

const sequelize = new Sequelize('dekam_etb', 'dekam_etb', '2020etb!', {
  host: '198.58.103.35',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
  User
}