var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    price: { type: Number },
    created: { type: Number },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
    clientId: { type: String },
    clientName: { type: String },
    clientAdress: { type: String },
    clientPhone: { type: Number },
    isActive: { type: Boolean },
    status: { type: Number, default: 0 }
});


module.exports = mongoose.model('Order', orderSchema);