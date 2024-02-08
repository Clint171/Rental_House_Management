import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    // 1: tenant, 2: landlord 3: caretaker 4: visitor
    role: String
});

const User = mongoose.model("User", userSchema);

export default User;