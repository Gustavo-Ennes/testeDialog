const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Log = sequelize.define(
    "Log",
    {
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        meta: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = { Log };
