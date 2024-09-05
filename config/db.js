const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongoose host: ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to the Mongo`);
    }
}
module.exports={connectDB}