const { Profile } = require("../models/Profile");

async function getProfile(req, res) {
  try {
    const profile = await getProfileDb(req.params.id, res);
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createProfile(req, res) {
  try {
    const profile = await create({
      name: req.body.name,
      description: req.body.description,
      userId: req.body.userId,
    });
    res.json(profile);
  } catch (err) {
    console.error("Error creating profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateProfile(req, res) {
  try {
    const profile = await getProfileDb(req.params.id, res);

    profile.name = req.body.name ?? profile.name;
    profile.description = req.body.description ?? profile.description;
    profile.userId = req.body.userId ?? profile.userId;
    await profile.save();
    res.json({ profile });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteProfile(req, res) {
  try {
    const profile = await getProfileDb(req.params.id, res);
    await profile.destroy();
    return true;
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const getProfileDb = async (id, res) => {
  const profile = await Profile.findByPk(id);
  if (profile != null) return profile;
  res.status(404).json({ message: "Profile not found" });
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
