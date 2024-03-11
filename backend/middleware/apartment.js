const {User , Apartment} = require("../schema/schema.js");

const createApartment = async (req , res , next)=>{
    let newApartment = new Apartment(req.body);
    newApartment.owner = req.user._id;
    await newApartment.save();
    User.findByIdAndUpdate(req.user._id , {
        $push : {
            apartments : newApartment._id
        },
        role : "owner"
    }).then(()=>{
        res.sendStatus(201);
    });
}

const getApartments = async (req , res , next)=>{
    let apartments = await Apartment.find();
    res.json(apartments);
}

const getApartment = async (req , res , next)=>{
    let apartment = await Apartment.findById(req.params.id);
    res.json(apartment);
}


module.exports = {
    createApartment,
    getApartments,
    getApartment
}


