const {User , Apartment , Tenant , Feedback} = require("../schema/schema.js");

const getUsers  = async (req , res , next)=>{
    let users = await User.find({});
    res.json(users);
}

const getUser = async (req , res , next)=>{
    let user = await User.findById(req.params.id);
    res.json(user);
}

const getUserRegex = async (req , res , next)=>{
    let users = await User.find({username : {$regex : req.params.username}});
    res.json(users);
}

module.exports = {getUsers , getUser , getUserRegex};