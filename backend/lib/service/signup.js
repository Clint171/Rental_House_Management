import bcrypt from "bcrypt";

import User from "../db/user.js";
import Admin from "../db/admin.js";

const signupVisitor = (req , res , next) =>{
    let user = new User(req.body);
    if(!user.name || !user.email || !user.password) return res.sendStatus(400);
    User.findOne({$or : [{email : user.email} , {phone : user.phone}]}).then((doc , err)=>{
        if(err) return res.sendStatus(500);
        if(doc) return res.sendStatus(409);
    });
    user.role = "visitor";
    bcrypt.hash(user.password , 8).then((hash , err)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        user.password = hash;
        user.save();
        res.sendStatus(201);
    });
}

const addAdmin = (req , res , next) =>{
    let admin = new Admin(req.body);
    if(!admin.userName || !admin.password) return res.sendStatus(400);
    bcrypt.hash(admin.password , 8).then((hash , err)=>{
        if(err) return res.sendStatus(500);
        admin.password = hash;
        admin.save();
        res.sendStatus(201);
    });
}
export default {signupVisitor , addAdmin}