const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const blacklistToken = await blacklistTokenModel.findOne({ token: token });
    if (blacklistToken) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select("+password");
        if (!user) return res.status(401).json({ msg: "Unauthorized" });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
}


module.exports.authCaptian = async (req, res, next) => {
    // const token = req.cookies.token || req.headers.authCaptian.split(' ')[1];
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const blacklistToken = await blacklistTokenModel.findOne({ token: token });
    if (blacklistToken) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id).select("+password");
        if (!captain) return res.status(401).json({ msg: "Unauthorized" });
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
}