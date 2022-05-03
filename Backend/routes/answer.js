const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { addAnswer,getAnswer,editAnswer,deleteAnswer,getUserAnswer } = require('../controllers/answer');
const { isSignedIn,isSignedInNL } = require('../controllers/auth');

router.post('/addans/:qstnId',body('answer','Answer should have min length 5').isLength({min:5}),isSignedIn,addAnswer);

router.get('/getans/:qstnId',isSignedInNL,getAnswer);

router.put('/editans/:ansId',isSignedIn,editAnswer);

router.delete('/deleteans/:ansId',isSignedIn,deleteAnswer);

router.get('/getuserans',isSignedIn,getUserAnswer)

module.exports = router;