const Notify = require('../models/notify');
const CurrNotify = require("../models/curnotify");
const User = require('../models/user');
const Question = require('../models/question');

exports.getNotify = async (req,res)=>{
    try{
        const notify = await Notify.find({user:req.user._id}).populate('qstn').sort({createdAt:-1}).limit(10);
        const curr = await CurrNotify.findOne({user:req.user._id});
        return res.json({status:"ok",notify:notify,current:curr});
    }catch(err){
        return res.json({status:"error",message:err.message});
    }
}

exports.editNotify = async (req,res)=>{
    try{
        const notif = await CurrNotify.findOne({user:req.user._id});
        if(!notif){
            return res.json({status:"error",message:"notify not found"});
        }
        await CurrNotify.updateOne({user:req.user._id},{$set:{current:req.body.current}});
        return res.json({status:"ok",message:"updating success"});
    }catch(err){
        return res.json({status:"error",message:err.message});
    }
}

exports.addNotify = async (req,res)=>{
    try{
        const us = await User.findById({_id:req.user._id});
        const user = await User.exists({_id:req.body.userId});
        if(!user){
            return res.json({status:"error",message:"Access denied"});
        }
        const qstn = await Question.exists({_id:req.body.qstnId})
        if(!qstn){
            return res.json({status:"error",message:"Access denied"});
        }
        const str = `${us.username} has requested for your answer`
        const notif = new Notify({
            user:req.body.userId,
            title:str,
            qstn:req.body.qstnId
        })

        notif.save();
        return res.json({status:"ok",message:notif});
        

    }catch(err){
        return res.json({status:"error",message:err.message});
    }
}