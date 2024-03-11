const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    email : String,
    role : String,
    apartments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Apartment"
    }]
});

const User = mongoose.model("User" , userSchema);

const apartmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    address : String,
    rooms : Number,
    rent : Number,
    occupiedRooms : Number,
    tenants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tenant"
    }],
    feedback : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Feedback"
    }]
});

const Apartment = mongoose.model("Apartment" , apartmentSchema);

const tenantSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    apartment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Apartment",
        required : true
    },
    rent : Number,
    paymentHistory : [Object]
});

const Tenant = mongoose.model("Tenant" , tenantSchema);

const feedbackSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    apartment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Apartment",
        required : true
    },
    text : String,
    date : Date
});

const Feedback = mongoose.model("Feedback" , feedbackSchema);

module.exports = { User , Apartment , Tenant , Feedback};