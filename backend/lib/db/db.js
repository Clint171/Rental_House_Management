import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let url = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

mongoose.connect(url, {
    dbName: process.env.MONGO_DB,
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
    console.log("Connected to MongoDB");
});

export default db;