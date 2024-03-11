const {User , Apartment , Tenant , Feedback} = require("../schema/schema.js");

const checkOwnership = async (req , res , next)=>{
    if(req.params.id){
        let apartment = await Apartment.findById(req.params.id);
        if(!apartment){
            res.sendStatus(404);
            return;
        }
        if(apartment.owner.toString() === req.user._id.toString()){
            next();
        }else{
            res.sendStatus(403);
        }
    }
    else if(req.params.tenantId){
        let tenant = await Tenant.findById(req.params.tenantId);
        let apartment = await Apartment.findById(tenant.apartment);
        if(!apartment || !tenant){
            res.sendStatus(404);
            return;
        }
        if(apartment.owner.toString() === req.user._id.toString()){
            next();
        }
        else{
            res.sendStatus(403);
        }
    }
    else if(req.params.feedbackId){
        let feedback = await Feedback.findById(req.params.feedbackId);
        let apartment = await Apartment.findById(feedback.apartment);
        if(!apartment || !feedback){
            res.sendStatus(404);
            return;
        }
        if(apartment.owner.toString() === req.user._id.toString()){
            next();
        }
        else{
            res.sendStatus(403);
            return;
        }
    }
    else{
        next();
    }
}

const getApartments = async (req , res , next)=>{
    let apartments = await Apartment.find({owner : req.user._id}).populate({path: "feedback", populate : "user"}).populate("tenants");
    res.json(apartments);
}

const getApartment = async (req , res , next)=>{
    let apartment = await Apartment.findById(req.params.id).populate({
        path : "feedback",
        populate : {
            path : "user"
        }
    }).populate({
        path : "tenants",
        populate : {
            path : "user"
        }
    
    });
    res.json(apartment);
}

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

const updateApartment = async (req , res , next)=>{
    let updatedApartment = await Apartment.findByIdAndUpdate(req.params.id , req.body);
    res.sendStatus(200);
}

const deleteApartment = async (req , res , next)=>{
    await Apartment.findByIdAndDelete(req.params.id);
    await Tenant.deleteMany({apartment : req.params.id});
    await Feedback.deleteMany({apartment : req.params.id});
    await User.findByIdAndUpdate(req.user._id , {
        $pull : {
            apartments : req.params.id
        }
    });
    res.sendStatus(200);
}

const getTenants = async (req , res , next)=>{
    let tenants = await Tenant.find({apartment : req.params.id}).populate("user");
    res.json(tenants);
}

const getTenant = async (req , res , next)=>{
    let tenant = await Tenant.findById(req.params.tenantId).populate("user");
    res.json(tenant);
}

const createTenant = async (req , res , next)=>{
    try{
        let newTenant = new Tenant(req.body);
    newTenant.apartment = req.params.id;
    newTenant.rent = (await Apartment.findById(req.params.id)).rent;
    newTenant.paymentHistory = [];
    await newTenant.save();
    let apartment = await Apartment.findById(req.params.id);
    let occupiedRooms = apartment.occupiedRooms + 1;
    await apartment.save();
    await Apartment.findByIdAndUpdate(req.params.id , {
        $push : {
            tenants : newTenant._id
        }
    });
    res.sendStatus(201);
    }catch(err){
        res.sendStatus(400);
    }
}

const updateTenant = async (req , res , next)=>{
    let updatedTenant = await Tenant.findByIdAndUpdate(req.params.tenantId , req.body);
    res.json(updatedTenant);
}

const deleteTenant = async (req , res , next)=>{
    await Tenant.findByIdAndDelete(req.params.tenantId);
    await Apartment.findByIdAndUpdate(req.params.id , {
        $pull : {
            tenants : req.params.tenantId
        },
        occupiedRooms : $inc(-1),
    });
    res.sendStatus(200);
}

const getFeedbacks = async (req , res , next)=>{
    let feedbacks = await Feedback.find({apartment : req.params.id}).populate("user");
    res.json(feedbacks);
}

const getFeedback = async (req , res , next)=>{
    let feedback = await Feedback.findById(req.params.feedbackId).populate("user");
    res.json(feedback);
}

const createFeedback = async (req , res , next)=>{
    let newFeedback = new Feedback(req.body);
    newFeedback.apartment = req.params.id;
    newFeedback.user = req.user._id;
    newFeedback.date = new Date();
    await newFeedback.save();
    await Apartment.findByIdAndUpdate(req.params.id , {
        $push : {
            feedback : newFeedback._id
        }
    });
    res.sendStatus(201);
}

const updateFeedback = async (req , res , next)=>{
    let updatedFeedback = await Feedback.findByIdAndUpdate(req.params.feedbackId , req.body);
    res.json(updatedFeedback);
}

const deleteFeedback = async (req , res , next)=>{
    await Feedback.findByIdAndDelete(req.params.feedbackId);
    await Apartment.findByIdAndUpdate(req.params.id , {
        $pull : {
            feedback : req.params.feedbackId
        }
    });
    res.sendStatus(200);
}

module.exports = {
    checkOwnership,
    getApartments,
    getApartment,
    createApartment,
    updateApartment,
    deleteApartment,
    getTenants,
    getTenant,
    createTenant,
    updateTenant,
    deleteTenant,
    getFeedbacks,
    getFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback
}