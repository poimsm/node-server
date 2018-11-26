var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    description: { type: String },
    quota: { type: Number },
    price: { type: Number },
    img: {
        id: {
          type: String
        },
        url: { 
          type: String
        }
    },
    initDate: { type: String },
    endDate: { type: String },    
    conditions: { type: Object },
    timestamp: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    isActive: { type: Boolean, required: true, default: true }
});


module.exports = mongoose.model('Coupon', couponSchema);