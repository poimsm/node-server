var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopperSchema = new Schema({
    userId: { type: String },
    name: { type: String },
    phone: { type: Number },
    created: { type: Number },
    isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model('Shopper', shopperSchema);