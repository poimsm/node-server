var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exploreServiceImportantSchema = new Schema({ 
    exploreService: { type: Schema.Types.ObjectId, ref: 'ExploreService' },
    mark: { type: Boolean },
    created: { type: Number },
    isActive: { type: Boolean, default: true },
});


module.exports = mongoose.model('ExploreServiceImportant', exploreServiceImportantSchema);