var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobAppSchema = new Schema({
    userId: { type: String },
    name: { type: String },
    phone: { type: Number },
    date: { type: Number },
    isActive: { type: Boolean, default: false }
});


module.exports = mongoose.model('job', jobAppSchema);