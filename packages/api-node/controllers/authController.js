const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/auth");

exports.signup = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 12);

            const token = getNewToken({ email });
            await User.create({ email, password: hashedPassword });

            return res.status(201).json({ token });
        } catch (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end(); // Not allowed
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user == null) res.status(404).json({ error: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const profile = await Profile.findOne({ where: { userId: user.id } });
        if (!profile)
            return res.status(404).json({ error: "No user profile found." });

        const token = getNewToken({ email, profile });
        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error creating post:", err);
        return res.status(500).json({ message: err.message });
    }
};

exports.tokenCheck = async (req, res) => {
    const { token } = req.body;
    jwt.verify(token, JWT_SECRET, (err, user) => {
        const status = err ? "invalid" : "valid";
        return res.status(200).send({ status });
    });
};

const getNewToken = ({ email, profile }) =>
    jwt.sign({ email, profile: JSON.stringify(profile) }, JWT_SECRET, { expiresIn: "10h" });
