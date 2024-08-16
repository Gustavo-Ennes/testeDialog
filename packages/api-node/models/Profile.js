const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Profile = sequelize.define(
    "Profile",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "SET NULL"
        },
    },
    {
        timestamps: true,
    }
);
module.exports = { Profile };
