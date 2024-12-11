const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainServices = require("../services/captain.services");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    try {
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: "Captain already exists" });
        }
        const hashPassword = await captainModel.hashedPassword(password);

        const captain = await captainServices.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(201).json({ token, captain });
}

module.exports.getcaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json({ captain });
}

module.exports.logoutCaptian = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "Logout Successfully" });
}