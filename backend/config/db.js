import mongoose from "mongoose";

async function mongoDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected ${conn.connection.host}`);
    }
    catch(err) {
        console.error(`Error: ${err.message}`)
    }
}

export default mongoDB