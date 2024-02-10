import User from '../../db/user.js';

const getAllUsers = (req , res , next) => {
    if(!req.user.userName) return res.sendStatus(403);
    User.find().then((users)=>{
        // remove password from user object
        users.forEach((user)=>{
            user.password = undefined;
        });
        res.json(users);
    });
}

const getUserById = (req , res , next) => {
    User.findById(req.params.id).then((user)=>{
        // remove password from user object
        user.password = undefined;
        res.json(user);
    });
}

const addUser = (req , res , next) => {
    if(req.user.userName || req.user.role == "landlord"){
        let newUser = new User(req.body);
        newUser.save();
    }
}

const updateUser = (req , res , next) => {
    if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8);
    if(req.user.userName){
        User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
            if (err) return res.sendStatus(500);
            return res.json(user);
        });
    }
    else if(req.user.role == "landlord"){
        User.findByIdAndUpdate(req.params.id, {role : req.body.role}, {new: true}, (err, user) => {
            if (err) return res.sendStatus(500);
            return res.json(user);
        });
    }
    else if(req.user.role == "caretaker"){
        let user = User.findById(req.params.id);
        if(user.role == "visitor" || user.role == "tenant"){
            user.role = req.body.role;
            user.save();
            return res.json(user);
        }
        else{
            return res.sendStatus(403);
        }
    }
    else{
        let user = User.findById(req.params.id);
        if(user._id == req.user._id){
            Object.assign(user , req.body);
            user.save();
            return res.json(user);
        }
    }
}

const deleteUser = (req , res , next) => {
    if(req.user.userName){
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) return res.sendStatus(500);
            return res.json(user);
        });
    }
    else if(req.user.role == "landlord"){
        let user = User.findById(req.params.id);
        if(user.role == "caretaker"){
            User.findByIdAndRemove(req.params.id, (err, user) => {
                if (err) return res.sendStatus(500);
                return res.json(user);
            });
        }
        else{
            return res.sendStatus(403);
        }
    }
    else{
        return res.sendStatus(403);
    }
}

export default {getAllUsers, getUserById, addUser, updateUser, deleteUser};