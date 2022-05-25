const express = require('express');
const { isSignedIn } = require('../controllers/auth');
const { getUser,getStudents,updatePic,getProfile,getTeachers } = require('../controllers/user')
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.get('/getuser/:userId',getUser);
router.get('/getstud',getStudents);
router.get('/getteach',getTeachers);
router.post('/updatepic',isSignedIn,upload.single('profileImg'),updatePic);
router.get('/getprofile',isSignedIn,getProfile)
module.exports = router;