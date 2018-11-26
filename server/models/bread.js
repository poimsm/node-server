var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    price: { type: Number },
    storeName: { type: String },
    storeId: { type: String },
    hotHours: { type: Object },
    lun: { type: Boolean },
    mar: { type: Boolean },
    mie: { type: Boolean },
    jue: { type: Boolean },
    vie: { type: Boolean },
    sab: { type: Boolean },
    dom: { type: Boolean }
});


module.exports = mongoose.model('Order', orderSchema);