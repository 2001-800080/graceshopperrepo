const Sequelize = require('sequelize')
const db = require('../db')

const Bouquet = db.define('bouquet', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 5000,
    get() {
      const pennies = this.getDataValue('price')
      return pennies / 100
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 50,
    validate: {
      min: 0
    }
  },
  available: {
    type: Sequelize.VIRTUAL,
    defaultValue: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://sf.tac-cdn.net/images/products/small/TEV28-2.jpg',
    validate: {
      isUrl: true
    }
  }
})

Bouquet.prototype.getAvailable = function() {
  if (this.quantity === 0) {
    this.available = false
    return false
  } else {
    this.available = true
    return true
  }
}

module.exports = Bouquet
