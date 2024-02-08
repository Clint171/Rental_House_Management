import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userName : String,
    password : String
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;