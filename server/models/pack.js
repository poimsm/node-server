var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    price: { type: Number },
    img: { type: String },
    table: { type: Object },
    timestamp: { type: Number },
    lists: { type: Object },
    isListActive: { type: Boolean },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    reviews: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number },
    isActive: { type: Boolean, required: true, default: true }
});


module.exports = mongoose.model('Pack', ticketSchema);