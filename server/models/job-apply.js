var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobApplySchema = new Schema({
    userId: { type: String },
    name: { type: String },
    phone: { type: Number },
    created: { type: Number },
    isAccepted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});


module.exports = mongoose.model('JobApply', jobApplySchema);	