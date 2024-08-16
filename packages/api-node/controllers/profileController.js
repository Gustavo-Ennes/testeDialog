const { User } = require("../models/User");
const { Profile } = require("../models/Profile");

const getProfile = async (req, res) => {
  try {
    const profile = await getProfileDb(req.params.id, res);
    return res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const createProfile = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    const user = await User.findOne({ where: { id: userId } });

    if (user == null)
      return res
        .status(404)
        .json({ error: "User should exists before it's profile." });

    const profile = await Profile.create({
      name,
      description,
      userId,
    });
    return res.json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await getProfileDb(req.params.id, res);

    profile.name = req.body.name ?? profile.name;
    profile.description = req.body.description ?? profile.description;
    profile.userId = req.body.userId ?? profile.userId;
    await profile.save();
    return res.json({ profile });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profile = await getProfileDb(req.params.id, res);
    await profile.destroy();
    return true;
  } catch (err) {
    console.error("Error deleting profile:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getProfileDb = async (id, res) => {
  const profile = await Profile.findByPk(id);
  if (profile != null) return profile;
  return res.status(404).json({ message: "Profile not found" });
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
