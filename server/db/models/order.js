const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // not needed
  // userId: {
  //   type: Sequelize.INTEGER
  // },
  date: {
    // ? nani, que pasa?
    // purchaseDate -> more clear
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING
  }, // multiple fields that may need to be stored: zip codes, etc. etc.
  quantity: {
    // total => virtual
    // https://sequelize.org/master/class/lib/data-types.js~VIRTUAL.html
    type: Sequelize.INTEGER
  },
  phoneNumber: {
    type: Sequelize.INTEGER
  },
  payment: {
    // Stripe, etc. -> let them deal with cards so that you don't have more private information in your database
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    },
    allowNull: false
  },
  status: {
    // could use something here for cart -> it does relate to all of these anyway.
    type: Sequelize.ENUM('pending', 'complete'),
    defaultValue: 'pending'
  },
  totalCost: {
    // could also be virtual
    type: Sequelize.FLOAT
  }
})

module.exports = Order

// may be a hook you can use to just add properites to the object if you wanted to.
// instance methods of orders => order.getInfo => calculate the total cost, quantity at that time so you don't need to store the hardcoded version because that is in fact duplicate code.
