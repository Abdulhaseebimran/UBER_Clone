const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const userRouter = require("./routes/user.routes");
const captainRouter = require("./routes/captain.routes");
const mapRouter = require("./routes/maps.routes");
const rideRouter = require("./routes/ride.routes");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/maps", mapRouter);
app.use("/rides", rideRouter);

module.exports = app;