import mongoose from "mongoose"

const inventorySchema = new mongoose.Schema({
    items: [Object]
});

const Inventory = mongoose.model("Inventory" , inventorySchema);

export default Inventory;