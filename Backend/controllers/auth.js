const User = require("../models/user.js");
const CurrNotify = require("../models/curnotify")
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req,res)=>{

    try{
        //validation of the fields
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.json({status:"error",message:error.errors[0].msg});
        }
        //checking if email already exists
        const user1 = await User.exists({email:req.body.email});
        if (user1) {
            return res.json({
                status:"error",
                message:"User with this email already exists"
            })
        }
        

        //checking if username already exists
        let user2 = await User.exists({username:req.body.username})
        if (user2) {
            return res.json({
                status:"error",
                message:"Username already taken"
            })
        }

        //hashing password and creating user
        const hashPass = await bcrypt.hash(req.body.password,10);
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            hash_password : hashPass,
            role:req.body.role
        });
        user.save()
        .then(()=>{
            return res.send({status:"ok",message:"Signup successfull"})
        })
        .catch((err)=>{
            return res.send({status:"error",message:"signup unsuccessfull"})
        })

        
    }catch(err){
        return res.status(500).json({
            status :"error",
            message:err.message
        })
    }
    
}

exports.signin = async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json({status:"error",messsage:error.errors[0].msg})
    }
    try{
            //chcking if email exists
            const {email,password} = req.body;
            const user = await User.findOne({email:email},{hash_password:1})
            if(!user){
                return res.json({status:"error",message:"Incorrect email or password"})
            }

            //checking if password is correct
            const pass = await bcrypt.compare(password,user.hash_password);
            if(!pass){
                return res.send({status:"error",message:"Incorrect email or password"})
            }

            //generate auth token
            const token = jwt.sign({_id:user._id},process.env.SECRET)
            

            //sending token to the user
            return res.json({status:"ok",token,user:user})
            

    }catch(err){
        console.log(err.message);
        return res.json({status:"error",message:"server error"})
    }

}

exports.signout = (req,res)=>{

    res.clearCookie("token");
    res.json({
        status : "ok",
        message : "signed out successfully"
    });
}




//protected route
exports.isSignedInNL = function(req,res,next){
   const token = req.headers['auth_token'];
    if(token && token!=='null'){
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err){
                req.isLogin = false;
                next();
            }
            req.user = user;
            req.isLogin = true
            next();
        });  
    }
    else{
        req.isLogin = false;
        next();
    }
}
exports.isSignedIn = function(req,res,next){
    
   const token = req.headers['auth_token'];
   if(!token){
       return res.json({status:"error",message:"Access denied"})
   }
   try{
        const user = jwt.verify(token,process.env.SECRET);
        req.user = user;
        next();

   }catch(err){
       return res.json({status:"error",message:"Access denied"})
   }
}

//custom middlewares

exports.isAuthenticated = function(req,res,next){
    let checker = req.profile && req.user && req.profile._id === req.user._id;
    if(!checker){
        return res.json({status:"error",message:"Access denied"})
    }
    next();
}

exports.isAdmin = function(req,res,next){
    if(req.profile.role === 0 || req.profile.role === 1){
        return res.status(403).json({status:"error",message:"Access denied"})
    }
    next();
}




























