const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        type:Schema.Types.ObjectId,
        ref:'Question',
    },
    answer:{
        type:String,
        required:true,
        trim:true
    },
    imagelink:{
        type:String
    },

},{timestamps:true})


module.exports = mongoose.model('Answer',answerSchema);