const {User , Apartment , Tenant , Feedback} = require("../schema/schema.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

const signupNewUser = async (req , res , next)=>{
    let newUser = new User(req.body);
    let dbUser = await User.findOne({email : req.body.email});
    if(dbUser) return res.status(406).send("User exists");
    bcrypt.hash(newUser.password , 10).then(async(hash , err)=>{
        if(err) return res.sendStatus(400);
        newUser.password = hash;
        await newUser.save();
        let token = jwt.sign(JSON.stringify(newUser), process.env.JWT_SECRET);

        res.cookie("token" ,token , {
            httpOnly : true,
            path : "/",
            maxAge : 1000 * 60 * 60 * 12,
            sameSite : "none"
        });
        res.sendStatus(201);
    });
}

const loginUser = async (req , res , next)=>{
    let dbUser = await User.findOne({email : req.body.email});
    if(!dbUser) return res.sendStatus(404);
    let confirmed = await bcrypt.compare(req.body.password , dbUser.password);
    if(!confirmed) return res.sendStatus(401);
    let token = jwt.sign(JSON.stringify(dbUser), process.env.JWT_SECRET);
    res.cookie("token" ,token , {
        httpOnly : true,
        path : "/",
        maxAge : 1000 * 60 * 60 * 12,
        sameSite : "none"
    });
    res.sendStatus(200);
}

const authenticate = async (req , res , next)=>{
    let token = req.cookies.token;
    if(!token) return res.sendStatus(401);
    jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const changePassword = async (req , res , next)=>{
    let dbUser = await User.findOne({email : req.user.email});
    if(!dbUser) return res.sendStatus(404);
    let confirmed = await bcrypt.compare(req.body.oldPassword , dbUser.password);
    if(!confirmed) return res.sendStatus(401);
    bcrypt.hash(req.body.newPassword , 10).then(async(hash , err)=>{
        if(err) return res.sendStatus(400);
        dbUser.password = hash;
        await dbUser.save();
        res.sendStatus(200);
    });
}

const logout = async (req , res , next)=>{
    res.clearCookie("token");
    res.sendStatus(200);
}

const viewProfile = async (req , res , next)=>{
    res.json(req.user);
}

module.exports = { signupNewUser , loginUser , authenticate , changePassword , logout , viewProfile};