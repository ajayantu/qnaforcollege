const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
    },
    qstn:{
        type:Schema.Types.ObjectId,
        ref:'Question'
    },
    user_profile:{
        type:String
    }
   
},{timestamps:true})


module.exports = mongoose.model('Notify',notifySchema);