var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponSchema = new Schema({ 
    category: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    discountPrice: { type: Number },
    img: {
      id: { type: String },
      url: { type: String }
     },
    initDate: { type: String },
    endDate: { type: String },    
    conditions: { type: Object },
    created: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    buys: { type: Number },
    destacado: { type: Boolean }    
});


module.exports = mongoose.model('Coupon', couponSchema);