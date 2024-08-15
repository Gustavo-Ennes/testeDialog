const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./database.sqlite",
// });
const sequelize = new Sequelize("database", "sa", "1Senha!.", {
    host: "localhost",
    dialect: "postgres",
});

module.exports = { sequelize };
