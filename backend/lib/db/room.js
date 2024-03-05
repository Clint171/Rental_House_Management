import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: String,
    rent: Number,
    availability: Boolean,
    inventory: ObjectId({ref : 'Inventory'}),
    capacity: Number
});

const Room = mongoose.model("Room" , roomSchema);

export default Room;