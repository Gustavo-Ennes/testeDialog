const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

const { verify, sign } = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const { JWT_SECRET } = require("../config/auth");

const signup = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;

            if (!verifyEmailAndPassword(req.body))
                return res
                    .status(400)
                    .json({ error: "Email or password is missing." });

            const hashedPassword = await hash(password, 12);

            const token = getNewToken({ email });
            await User.create({ email, password: hashedPassword });
            // TODO create a profile too, since it's a requirement to login

            return res.status(201).json({ token });
        } catch (error) {
            console.error(`error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end(); // Not allowed
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
            res.status(404).json({ error: "User not found." });
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

const getNewToken = ({ email, profile, expired = false }) =>
    sign({ email, profile: JSON.stringify(profile) }, JWT_SECRET, {
        expiresIn: expired ? -1 : "10h",
    });
const verifyEmailAndPassword = (body) =>
    body.email != null &&
    body.email != "" &&
    body.password != null &&
    body.password != "";

module.exports = {
    login,
    signup,
    tokenCheck,
    getNewToken,
};
