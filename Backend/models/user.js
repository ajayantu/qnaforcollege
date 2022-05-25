const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    hash_password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
        required:true
    },
    qstn:{
        type:Number,
        default:0
    },
    ans:{
        type:Number,
        default:0
    },
    points:{
        type:Number,
        default:10
    },
    badge:{
        type:Number,
        default:0
    },
    profile_pic:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);