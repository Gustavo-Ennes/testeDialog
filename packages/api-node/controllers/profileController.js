const { User } = require("../models/User");
const { Profile } = require("../models/Profile");
const { getLogger } = require("../config/winston");

const profileLogger = getLogger("ProfileController");

const getProfile = async (req, res) => {
    try {
        const profile = await getProfileDb(req.params.id, res);
        if (!profile) {
            const error = "Profile not found";
            profileLogger.error(error);
            return res.status(404).json({ error });
        }

        return res.status(200).json(profile);
    } catch (err) {
        const error = `Error fetching profile: ${err.message}`;
        profileLogger.error(error, { params: req.params });
        return res.status(500).json({ error });
    }
};

const createProfile = async (req, res) => {
    try {
        const { userId, name, description } = req.body;
        const user = await User.findOne({ where: { id: userId } });

        if (user == null || !name || !description) {
            const error = "User should exists before it's profile.";
            profileLogger.error(error);
            return res.status(404).json({ error });
        }

        const profile = await Profile.create({
            name,
            description,
            userId,
        });
        return res.status(201).json(profile);
    } catch (err) {
        const error = `Error creating the profile: ${err.message}`;
        profileLogger.error(error, { body: req.body });
        return res.status(500).json({ error });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        if (!id || (!name && !description)) {
            const error = "Update needs id plus name or description";
            profileLogger.error(error);
            return res.status(400).send({ error });
        }

        const profile = await getProfileDb(id, res);
        if (!profile) {
            const error = "Profile not found";
            profileLogger.error(error);
            return res.status(404).json({ error });
        }

        profile.name = name ?? profile.name;
        profile.description = description ?? profile.description;
        await profile.save();
        return res.json(profile);
    } catch (err) {
        const error = `Error updating the profile: ${err.message}`;
        profileLogger.error(error, { body: req.body });
        return res.status(500).json({ error });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await getProfileDb(req.params.id);
        if (!profile) {
            const error = "Profile not found";
            profileLogger.error(error, { params: req.params });
            return res.status(404).json({ error });
        }

        await profile.destroy();
        return res.status(200).send();
    } catch (err) {
        const error = `Error deleting the profile: ${err.message}`;
        profileLogger.error(error, { params: req.params });
        return res.status(500).json({ error });
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
