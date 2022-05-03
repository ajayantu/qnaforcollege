const Question = require('../models/question');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { findBadge } = require('../Helper/Badgehelper');

exports.addQstn = async (req,res)=>{
    try{
        const err = validationResult(req);
    
        if(!err.isEmpty()){
            return res.json({staus:"error",message:err.errors[0].msg})
        }
    
        const qstn = new Question({
            user : req.user._id,
            title : req.body.title,
            description : req.body.description,
            visibility : req.body.visibility
        });
        qstn.save();
    
        const user = await User.findById(req.user._id);
        const badge = findBadge(user.points+10);
    
        user.qstn = user.qstn + 1;
        user.points = user.points + 10;
        user.badge = badge;
        user.save();
        return res.json({status:"ok",question:qstn});
    }catch(err){
        return res.json({staus:"error",message:err.message})
    }
}

exports.getUserQstns = async (req,res)=>{
    try{
        const qstns = await Question.find({user:req.user._id},{ title:1, description:1, ansnumber:1, createdAt:1, updatedAt:1, user:1 });
        res.json({status:"ok",question:qstns});
    }catch(err){
        return res.json({status:"error",message:"server error"});
    }
}

exports.getQuestions = async (req,res)=>{
    let dpages=10;
    let qstns;
    let query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || dpages;
    const skip = (page-1)*pageSize;
    const total = await Question.countDocuments();
    const pages = Math.ceil(total / pageSize);
    try{
        
        if(req.isLogin){
            const user = await User.findById(req.user._id,{role:1});
            if(user.role !== 3){
                query = Question.find({$or:[{visibility:3},{visibility:user.role}]}).populate('user','username badge profile_pic').sort({createdAt:-1});
            }
            else{
                query = Question.find().sort({createdAt:-1}).populate('user','username badge profile_pic');
            }

            query = query.skip(skip).limit(pageSize);
            qstns = await query;
        }
        else{
            query = Question.find({visibility:3}).populate('user','username badge profile_pic').sort({createdAt:-1});
            query = query.skip(skip).limit(pageSize);
            qstns = await query;
        }
        return res.json({status:"ok",page,count:qstns.length,pages,questions:qstns});

    }catch(err){
        return res.json({status:"error",message:err.message});
    }
}

exports.editQuestion = async (req,res)=>{

    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.json({status:"error",message:err.errors[0].msg});
    }
    try{
            let qstn = await Question.findById(req.params.qstnId,{user:1});
            if(!qstn){
                return res.json({status:"error",message:"question not found"});
            }

            ///checking if the question belong to the user or not
            if(qstn.user.toString() !== req.user._id){
                return res.json({status:"error",message:"Access denied"});
            }

            if(req.body.title){qstn.title = req.body.title}
            if(req.body.description){qstn.description = req.body.description}
            if(req.body.visibility){qstn.visibility = req.body.visibility}
            await qstn.save();

            // await Question.updateOne({_id:req.params.qstnId},{$set:newQstn});
            res.json({status:"ok",message:"Updated successfully"})
    }catch(err){
        return res.json({status:"error",message:"some error occured"});
    }
}

exports.deleteQuestion = async (req,res)=>{
    try{

        const qstn = await Question.findOne({_id:req.params.qstnId},{user:1});
        if(!qstn){
            return res.json({status:"error",message:"Question not found"});
        }
    
        ///checking if the question belong to the user or not
        if(qstn.user.toString() !== req.user._id){
            return res.json({status:"error",message:"Access denied"});
        }
        
        await Question.findByIdAndDelete(req.params.qstnId);
        res.json({status:"ok",message:"Deleted successfully"});
    }catch(err){
        return res.json({status:"error",message:"some error occured"});
    }

    
}