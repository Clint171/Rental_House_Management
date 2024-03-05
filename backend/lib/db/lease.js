import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema({
    roomId: String,
    tenantId: String,
    startDate: Date,
    endDate: Date,
    rent: Number,
    deposit: Number,
    status: String,
    // 0: active, 1: expired, 2: terminated
    leaseStatus: String,
    // 0: monthly, 1: yearly
    leaseType: String
});

const Lease = mongoose.model("Lease" , leaseSchema);

export default Lease;