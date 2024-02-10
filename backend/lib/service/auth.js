import jwt from 'jsonwebtoken';

const auth = (req , res , next)=>{
    let token = req.headers["authorization"] && req.headers['authorization'].split(" ")[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token , process.env.JWT_SECRET).then((err , user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

export default auth;