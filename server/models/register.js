var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hoursRegisterSchema = new Schema({
    day: { type: String },
    date: { type: Number },
    isActive: { type: Boolean },
    hours: {
        one: { type: Number },
        two: { type: Number },
        three: { type: Number },
        four: { type: Number },
        five: { type: Number },
        six: { type: Number },
        seven: { type: Number },
        eight: { type: Number },
        nine: { type: Number },
        ten: { type: Number }
    }    
});


module.exports = mongoose.model('Available-hour', hoursRegisterSchema);