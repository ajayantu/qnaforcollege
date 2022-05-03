const Answer = require('../models/answer');
const { validationResult } = require('express-validator')
const Question = require('../models/question');
const User = require('../models/user');
const Notify = require('../models/notify');
const { findBadge } = require('../Helper/Badgehelper');

exports.addAnswer = async (req,res)=>{
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json({status:"error",message:err.errors[0].msg});
    }
    try{

        const user = await User.findById(req.user._id,{role:1,ans:1,points:1,username:1});
        const qstn = await Question.findOne({_id:req.params.qstnId});
        if(!qstn){
            return res.json({status:"error",message:"Question not found"})
        }
        const badge = findBadge(user.points+15);
        
        const alreadyAnswered = qstn.answeredby.includes(req.user._id);
        if(alreadyAnswered){
            return res.json({status:"error",message:"Already answered",flag:1})
        }

        if(qstn.visibility !== 3 && qstn.visibility !== user.role && user.role !== 3){
            return res.json({status:"error",message:"Access denied"})
        }

        const ans = new Answer({
            user:req.user._id,
            question:req.params.qstnId,
            answer:req.body.answer
        })
    
        ans.save();

        user.ans = user.ans+1;
        user.points = user.points+15;
        user.badge = badge;
        await user.save();

        qstn.ansnumber = qstn.ansnumber+1;
        qstn.answeredby.push(req.user._id);
        await qstn.save();

        const str = `${user.username} Answered your Question`;
        const not = new Notify({
            user:qstn.user,
            title:str,
            // question:qstn.title,
            qstn:qstn._id
        })
        await not.save();
    
        return res.json({status:"ok",answer:ans});
    }catch(err){
        return res.json({status:"error",message:err.message})
    }
}

exports.getAnswer = async (req,res)=>{

    const qstn = await Question.findById(req.params.qstnId);
    if(!qstn){
        return res.json({status:"error",message:"Question not found"});
    }
    if(req.isLogin){
        try{
            const user = await User.findById(req.user._id,{role:1});
            if(qstn.visibility !== 3 && qstn.visibility !== user.role && user.role !== 3){
                return res.json({status:"error",message:"Access denied"})
            }
            const answers = await Answer.find({question:req.params.qstnId})
            return res.json({status:"ok",answers:answers}); 
    
        }catch(err){
            return res.json({status:"error",message:"server error"})
        }
    }
    else{
        if(qstn.visibility !== 3){
            return res.json({status:"error",message:"Access denied"})
        }
        const answers = await Answer.find({question:req.params.qstnId})
        return res.json({status:"ok",answers:answers});
    }
    
}

exports.editAnswer = async (req,res)=>{

    try{

        const ans = await Answer.findById(req.params.ansId);
        if(!ans){
            return res.json({status:"error",message:"answer not found"});
        }
    
        if(ans.user.toString() !== req.user._id){
            return res.json({status:"error",message:"Access denied"});
        }
    
        ans.answer = req.body.answer;
        await ans.save();

        return res.json({status:"ok",message:"Answer edited successfully"})

    }catch(err){
        return res.json({status:"error",message:"server error"});
    }
}

exports.deleteAnswer = async (req,res)=>{
    try{

        const ans = await Answer.findById(req.params.ansId).populate("question","_id");
        if(!ans){
            return res.json({status:"error",message:"answer not found"});
        }
        if(ans.user.toString() !== req.user._id){
            return res.json({status:"error",message:"Access denied"});
        } 
        const delans =  await Answer.findByIdAndDelete(req.params.ansId);
        await Question.updateOne({_id:ans.question._id},{$inc:{ansnumber:-1}});
        return res.json({status:"ok",deletedans:delans});

    }catch(err){
        return res.json({status:"error",message:err.message});
    }
}

exports.getUserAnswer = async (req,res)=>{
    const ans = await Answer.find({user:req.user._id},{createdAt:0,updatedAt:0}).populate('question');

    res.json({status:"ok",answers:ans});
}