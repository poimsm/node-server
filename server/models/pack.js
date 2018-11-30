var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    img: {
      id: { type: String },
      url: { type: String }
    },
    content: { type: Object },
    created: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number }
});


module.exports = mongoose.model('Pack', ticketSchema);