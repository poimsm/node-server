var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var takeOrderSchema = new Schema({
    created: { type: Number },
    shopper: { type: Schema.Types.ObjectId, ref: 'Shopper' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    status: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
});


module.exports = mongoose.model('TakeOrder', takeOrderSchema);