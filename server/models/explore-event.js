var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    imgs: { type: Object },
    initHour: { type: String },
    endHour: { type: String },
    site: { type: String },
    created: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number }
});


module.exports = mongoose.model('explore_event', ticketSchema);