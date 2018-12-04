var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeImportantSchema = new Schema({
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    mark: { type: Boolean },
    created: { type: Number },
    isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model('StoreImportant', storeImportantSchema);