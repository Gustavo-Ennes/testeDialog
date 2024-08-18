const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Post = sequelize.define(
    "Post",
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        profileId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Profiles",
                key: "id",
            },
            onDelete: "SET NULL",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = { Post };
