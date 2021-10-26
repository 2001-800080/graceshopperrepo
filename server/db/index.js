const db = require('./db')

// register models
const {  User,
    Order,
    Bouquet,
    BouquetOrder} = require('./models')

module.exports = {db,   User,
    Order,
    Bouquet,
    BouquetOrder}
