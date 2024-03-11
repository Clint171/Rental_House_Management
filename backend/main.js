const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountRouter = require("./routes/accountRouter.js");
const apartmentRouter = require("./routes/apartmentRouter.js");
const ownerRouter = require("./routes/ownerRouter.js");
const tenantRouter = require("./routes/tenantRouter.js");
const userRouter = require("./routes/userRouter.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({
    origin: ["http://localhost:5500", "https://apex-apartment-management-system-frontend.onrender.com"],
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB,
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});

app.use(express.static(__dirname + "/frontend"));
app.use("/account", accountRouter);
app.use("/apartments", apartmentRouter);
app.use("/owner", ownerRouter);
app.use("/tenant", tenantRouter);
app.use("/users" , userRouter);

app.use((req , res)=>{
    res.send("An error occurred fetching the resource!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});