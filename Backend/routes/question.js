const express = require('express');
const router = express.Router();
const {isSignedIn,isSignedInNL} = require('../controllers/auth');
const {addQstn,getUserQstns,getQuestions,editQuestion,deleteQuestion} = require('../controllers/question');
const { body } = require('express-validator');

router.post('/addqstn',[body('title').isLength({min:5}).withMessage("Title min length should be 5"),body('description').isLength('5').withMessage("Description min length should be 5"),body('visibility').isNumeric()],isSignedIn,addQstn)

router.get('/getuserqstn',isSignedIn,getUserQstns);

router.get('/getqstn',isSignedInNL,getQuestions);

router.put('/editqstn/:qstnId',isSignedIn,editQuestion);

router.delete('/deleteqstn/:qstnId',isSignedIn,deleteQuestion);

module.exports = router;