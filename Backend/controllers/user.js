const User = require('../models/user');
const fs = require('fs');

exports.updatePic = async (req,res)=>{
    const url = req.protocol + '://' + req.get('host');
    const finalUrl = url + '/public/' + req.file.filename;
    console.log("Url is : ",finalUrl);

    const user = await User.findById(req.user._id,{profile_pic:1});
    if(user.profile_pic)
    {
        const pathh = user.profile_pic;
        user.profile_pic = finalUrl;
        user.save();
        const realpath = "public/"+pathh.split("public")[1]
        if(fs.existsSync(realpath)){
            console.log("The path exists and can be deleted");
            fs.unlink(realpath, (err) => {
                if (err) {
                console.error(err);
                    return res.json({status:"error"});
                }
                return res.json({status:"success",url:finalUrl});
            })
        }
        else
        {
            return res.json({staus:"error"});
        }
    }
    else
    {
        user.profile_pic = finalUrl;
        user.save();
        return res.json({status:"success",url:finalUrl});
    }
    
}
exports.getUser = async (req,res)=>{

    try{
        const user = await User.findById(req.params.userId,{username:1,role:1,qstn:1,ans:1,points:1,profile_pic:1});
        if(!user){
            return res.json({status:"error",message:"user not found"})
        }
        return res.json({status:"ok",user:user})

    }catch(err){
        return res.json({status:"error",message:err.message})
    }


    

}

exports.getStudents = async (req,res)=>{
    try{
        const users = await User.find({role:0}).sort({createdAt:-1});
        return res.json({status:"ok",students:users});
    }catch(err){
        return res.json({status:"error",message:err.message})
    }
}