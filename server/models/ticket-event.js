var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    description: { type: String },
    quota: { type: Number },
    price: { type: Number },
    imgs: { type: Object },
    initHour: { type: String },
    endHour: { type: String },
    site: { type: String },
    timestamp: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    reviews: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number },
    isActive: { type: Boolean, required: true, default: true }
});


module.exports = mongoose.model('Ticket_event', ticketSchema);