import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../db/user.js';
import Admin from '../db/admin.js';

dotenv.config();

const loginUser = async (req , res , next)=>{
    let user = await User.findOne({$or : [{email : req.body.identity},{phone : req.body.identity}]}).exec();
    if(!user) return res.sendStatus(404);
    let isAuth = await bcrypt.compare(req.body.password , user.password);
    if(isAuth){
        let token = jwt.sign(JSON.stringify(user) , process.env.JWT_SECRET);
        res.json({token : token});
    }
    else{
        res.sendStatus(401);
    }
}

const loginAdmin = async (req , res , next)=>{
    let user = await Admin.findOne({userName : req.body.userName}).exec();
    if(!user) return res.sendStatus(404);
    let isAuth = await bcrypt.compare(req.body.password , user.password);
    if(isAuth){
        let token = jwt.sign(JSON.stringify(user) , process.env.JWT_SECRET);
        res.json({token : token});
    }
    else{
        res.sendStatus(401);
    }
}

export default {loginUser , loginAdmin};