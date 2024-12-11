const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Database Connected: ${connection.connection.host}`);
    }catch(err){
        console.log("MongoDB Connection Error: " + err.message);
    }
};

module.exports = connectDB;