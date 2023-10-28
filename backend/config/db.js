import mongoose, { mongo } from "mongoose";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Conected to database")
    }
    catch (e) {
        console.log("failed to connect to db", e.message)
        process.exit(1)
    }
}

export default connectDB