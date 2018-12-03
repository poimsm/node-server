var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeImportantSchema = new Schema({
    storeId: { type: String },
    mark: { type: Boolean },
    created: { type: Number },
    isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model('StoreImportant', storeImportantSchema);