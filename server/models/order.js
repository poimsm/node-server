var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    price: { type: Number },
    created: { type: Number },
    storeId: { type: String },
    storeName: { type: String },
    storeAdress: { type: String },
    clientId: { type: String },
    clientName: { type: String },
    clientAdress: { type: String },
    clientPhone: { type: Number },
    shopperId: { type: String },
    shopperName: { type: String },
    hour: { type: Number },
    isBread: { type: Boolean },
    isActive: { type: Boolean },
    isCanceled: { type: Boolean }
});


module.exports = mongoose.model('Order', orderSchema);