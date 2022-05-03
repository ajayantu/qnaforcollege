const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qstnSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    imagelink:{
        type:String
    },
    visibility:{
        type:Number,
        default:3
    },
    ansnumber:{
        type:Number,
        default:0,
    },
    answeredby:{
        type:Array,
        default:[]
    }

},{timestamps:true})


module.exports = mongoose.model('Question',qstnSchema);