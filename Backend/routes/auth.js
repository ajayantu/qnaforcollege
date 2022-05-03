const express = require('express');
const router = express.Router();
const {signout,signup,signin,isSignedIn} = require('../controllers/auth');
const { body } = require('express-validator');

router.post('/signup',[body('username').isLength({min:3}).withMessage("username should have min length 3"),
                         body('email').isEmail().withMessage("invalid email format"),
                         body('password').isLength({min:5}).withMessage("password should have min length 5")],signup);

router.post('/signin',[body('email').isEmail().withMessage("invalid email format"),
                        body('password').isLength({min:5}).withMessage("password should have min length 5")],signin)
router.get('/signout',signout);

router.get('/test',isSignedIn,(req,res)=>{
    res.json({status:"ok",message:"test successful",user:req.user})
})
module.exports = router;