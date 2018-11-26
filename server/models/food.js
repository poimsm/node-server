var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    price: { type: Number },
    img: { type: String },
    lists: { type: Object },
    isListActive: { type: Boolean },
    timestamp: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    reviews: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number },
    isActive: { type: Boolean, required: true, default: true }
});


module.exports = mongoose.model('Food', ticketSchema);