var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exploreServiceSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    description: { type: String},
    price: { type: Number },    
    duration: { type: String },    
    site: { type: String },
    imgs: { type: Object },
    hours: { type: Object},
    lists: { type: Object },
    activeDays: { type: Object },
    created: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    totalStartsGiven: { type: Number },
    sumAllStarts: { type: Number },
    startsAverage: { type: Number }
});


module.exports = mongoose.model('explore_service', exploreServiceSchema);