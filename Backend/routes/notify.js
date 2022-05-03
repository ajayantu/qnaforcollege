const express = require('express');
const router = express.Router();
const {isSignedIn} = require('../controllers/auth');
const { getNotify,editNotify,addNotify } = require('../controllers/notify');

router.get('/getnotify',isSignedIn,getNotify);
router.put('/editnotify',isSignedIn,editNotify);
router.post('/addnotify',isSignedIn,addNotify);

module.exports = router;