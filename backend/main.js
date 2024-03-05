import express from 'express';
import dotenv from 'dotenv';
import db from './lib/db/db.js';
import cors from 'cors';
import adminRouter from './lib/routers/admin.js';
import signupRouter from './lib/routers/signup.js';
import loginRouter from './lib/routers/login.js';
import userRouter from './lib/routers/api/user.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/admin" , adminRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use('/users' , userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});