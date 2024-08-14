const Profile = require('./Profile')
const Post = require('./Post')
const User = require("./User")

Profile.hasMany(Post, { foreignKey: "profileId" });
Post.belongsTo(Profile, { foreignKey: "profileId" });
User.hasOne(Profile, {foreignKey: "userId"});
Profile.belongsTo(User, { foreignKey: "userId" });
