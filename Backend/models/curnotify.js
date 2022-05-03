const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const curNotifySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    current:{
        type:String,
        default:"0"
    }

})


module.exports = mongoose.model('CurNotify',curNotifySchema);