var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeApplySchema = new Schema({
    userId: { type: String },
    category: { type: String },
    name: { type: String },
    phone: { type: Number },
    created: { type: Number },
    isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model('StoreApply', storeApplySchema);