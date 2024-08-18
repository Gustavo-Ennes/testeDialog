const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const { JWT_SECRET } = require("../config/auth");
const { verifyEmailAndPassword, verifyNameAndDescription } = require("../validation");
const { getNewToken } = require("../utils/token");
const { getLogger } = require("../config/winston");

const authLogger = getLogger("AuthController");

const signup = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { email, password, name, description } = req.body;

            if (!verifyEmailAndPassword(req.body)) {
                const error = "Email or password is missing.";
                authLogger.error(error);
                return res.status(400).json({ error });
            }

            if (!verifyNameAndDescription(req.body)) {
                const error = "Name or description is missing.";
                authLogger.error(error);
                return res.status(400).json({ error });
            }

            const user = await User.findOne({ where: { email } });
            if (user != null) {
                const error = "Email already taken by another user.";
                authLogger.error(error);
                return res.status(400).json({ error });
            }

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

            authLogger.info(
                `User ${createdUser.email} and a token was created.`
            );
            return res.status(201).json({ token });
        } catch (err) {
            const error = `Error at signup: ${err.message}`;
            authLogger.error(error, { body: req.body });
            return res.status(500).json({ error });
        }
    } else {
        return res.status(405).end();
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!verifyEmailAndPassword(req.body)) {
            const error = "Email or password is missing.";
            authLogger.error(error);
            return res.status(400).json({ error });
        }

        const user = await User.findOne({ where: { email } });
        if (user == null) {
            const error = "User not found.";
            authLogger.error(error, {body: req.body});
            return res.status(404).json({ error });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            const error = "Invalid password.";
            authLogger.error(error);
            return res.status(401).json({ error });
        }

        const profile = await Profile.findOne({ where: { userId: user.id } });
        if (!profile) {
            const error = "No user profile found.";
            authLogger.error(error);
            return res.status(404).json({ error });
        }

        const token = getNewToken({ email, profile });

        authLogger.info(`User ${profile.name} is logged in.`);
        return res.status(200).json({ token });
    } catch (err) {
        const error = `Error at login: ${err.message}`;
        authLogger.error(error, { email });
        return res.status(500).json({ error });
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
