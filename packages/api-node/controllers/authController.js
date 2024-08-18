const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const { JWT_SECRET } = require("../config/auth");
const { verifyEmailAndPassword, verifyNameAndDescription } = require("../validation");
const { getNewToken } = require("../utils/token");

const signup = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, password, name, description } = req.body;

            if (!verifyEmailAndPassword(req.body))
                return res
                    .status(400)
                    .json({ error: "Email or password is missing." });

            if (!verifyNameAndDescription(req.body))
                return res
                    .status(400)
                    .json({ error: "Name or description is missing." });

            const user = await User.findOne({ where: { email } });
            if (user != null)
                return res
                    .status(400)
                    .json({ error: "Email already taken by another user." });

            const hashedPassword = await hash(password, 12);

            const createdUser = await User.create({
                email,
                password: hashedPassword,
            });
            const profile = await Profile.create({
                name,
                description,
                userId: createdUser.id,
            });
            const token = getNewToken({ email, profile });

            return res.status(201).json({ token });
        } catch (error) {
            console.error(`error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).end();
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!verifyEmailAndPassword(req.body))
            return res
                .status(400)
                .json({ error: "Email or password is missing." });

        const user = await User.findOne({ where: { email } });
        if (user == null) {
            return res.status(404).json({ error: "User not found." });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const profile = await Profile.findOne({ where: { userId: user.id } });
        if (!profile)
            return res.status(404).json({ error: "No user profile found." });

        const token = getNewToken({ email, profile });
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error at login:", err);
        return res.status(500);
    }
};

const tokenCheck = (req, res) => {
    const { token } = req.body;
    verify(token, JWT_SECRET, (err, _) => {
        const status = err ? "invalid" : "valid";
        return res.status(200).send({ status });
    });
};

module.exports = {
    login,
    signup,
    tokenCheck,
    getNewToken,
};
