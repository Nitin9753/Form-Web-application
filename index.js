const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors");
const { connectDB } = require("./config/db");
const formRouter = require("./routes/formRoutes");
dotenv.config();
connectDB();
const app=express();
app.use(express.json());
app.use(cors({origin: true}));
app.use("/api", formRouter);
app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server started at port http://localhost:4000`);
} )