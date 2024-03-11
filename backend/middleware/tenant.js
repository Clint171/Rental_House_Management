const {User , Apartment , Tenant , Feedback} = require("../schema/schema.js");

const viewDashboard = async (req , res , next)=>{
    let tenantDetails = await Tenant.findOne({user : req.user._id}).populate("apartment").populate("user");
    if(!tenantDetails){
        res.sendStatus(404);
        return;
    }
    res.json(tenantDetails);
}

const getFeedbacks = async (req , res , next)=>{
    let tenant = await Tenant.findOne({user : req.user._id});
    let apartment = await Apartment.findById(tenant.apartment);
    let feedbacks = await Feedback.find({_id : {$in : apartment.feedback}}).populate("user");
    res.json(feedbacks);
}

const createFeedback = async (req , res , next)=>{
    let newFeedback = new Feedback(req.body);
    newFeedback.user = req.user._id;
    newFeedback.date = new Date();
    let tenant = await Tenant.findOne({user : req.user._id});
    let apartment = await Apartment.findById(tenant.apartment);
    newFeedback.apartment = apartment._id;
    await newFeedback.save();
    apartment.feedback.push(newFeedback._id);
    await apartment.save();
    res.json(newFeedback);
}

const updateFeedback = async (req , res , next)=>{
    let feedback = await Feedback.findById(req.params.feedbackId);
    if(!feedback){
        res.sendStatus(404);
        return;
    }
    if(feedback.user.toString() !== req.user._id.toString()){
        res.sendStatus(403);
        return;
    }
    feedback.text = req.body.text;
    await feedback.save();
    res.json(feedback);
}

const deleteFeedback = async (req , res , next)=>{
    let feedback = await Feedback.findById(req.params.feedbackId);
    if(!feedback){
        res.sendStatus(404);
        return;
    }
    if(feedback.user.toString() !== req.user._id.toString()){
        res.sendStatus(403);
        return;
    }
    await Feedback.deleteOne(feedback);
    await Apartment.updateOne({feedback : feedback._id} , {$pull : {feedback : feedback._id}});
    res.sendStatus(200);
}

const viewPayments = async (req , res , next)=>{
    let tenant = await Tenant.findOne({user : req.user._id});
    res.json(tenant.paymentHistory);
}

const makePayment = async (req , res , next)=>{
    let tenant = await Tenant.findOne({user : req.user._id});
    let payment = req.body;
    payment.date = new Date();
    tenant.paymentHistory.push(payment);
    await tenant.save();
    res.json(tenant.paymentHistory);
}

module.exports = {
    viewDashboard,
    getFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    viewPayments,
    makePayment
}