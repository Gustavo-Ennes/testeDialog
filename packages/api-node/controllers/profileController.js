const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

const getProfile = async (req, res) => {
    try {
        const profile = await getProfileDb(req.params.id, res);

        return profile
            ? res.status(200).json(profile)
            : res.status(404).json({ error: "Profile not found" });
    } catch (err) {
        console.error("Error fetching profile:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

const createProfile = async (req, res) => {
    try {
        const { userId, name, description } = req.body;
        const user = await User.findOne({ where: { id: userId } });

        if (user == null || !name || !description)
            return res
                .status(404)
                .json({ error: "User should exists before it's profile." });

        const profile = await Profile.create({
            name,
            description,
            userId,
        });
        return res.status(201).json(profile);
    } catch (err) {
        console.error("Error creating profile:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

const updateProfile = async (req, res) => { 
    try {
        const { id, name, description } = req.body;
        const profile = await getProfileDb(id, res);

        if (!id || (!name && !description))
            return res
                .status(400)
                .send({ error: "Update needs id plus name or description" });

        profile.name = name ?? profile.name;
        profile.description = description ?? profile.description;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await getProfileDb(req.params.id);
        console.log(
            "🚀 ~ deleteProfile ~  to delete:",
            JSON.stringify(profile)
        );

        if (profile) {
            await profile.destroy();
            return res.status(200).send();
        }

        return res.status(404).json({ error: "Profile not found" });
    } catch (err) {
        console.error("Error deleting profile:", err);
        return res.status(500).json({ error: "Server Error" });
    }
};

const getProfileDb = async (id) => {
    const profile = await Profile.findByPk(id);
    if (profile != null) return profile;
    return null;
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
