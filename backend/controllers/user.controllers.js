const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const userServices = require("../services/user.services");
const authMiddleware = require("../middlewares/auth.middleware");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    console.log(req.body);
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashPassword = await userModel.hashedPassword(password);

    const user = await userServices.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
}


module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ user });
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ msg: "Logout successfully" });
}