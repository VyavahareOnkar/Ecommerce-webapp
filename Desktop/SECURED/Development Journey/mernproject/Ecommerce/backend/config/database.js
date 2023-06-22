
import mongoose from "mongoose";


export const connectDB = () => {

mongoose.connect(
        process.env.DB_URI)
        .then((data) => {
        console.log(`The DB Connection successfull at:${data.connection.host}`);
    });
}

