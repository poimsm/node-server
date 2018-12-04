var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    price: { type: Number },
    img: {
        id: { type: String },
        url: { type: String }
    },
    lists: { type: Object },
    created: { type: Number },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    buys: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number }
});


module.exports = mongoose.model('Food', foodSchema);