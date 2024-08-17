const { Sequelize } = require("sequelize");

const postgresUser = process.env.DB_USER;
const postgresPassword = encodeURIComponent(process.env.DB_PASSWORD);
const postgresHost = process.env.IS_CONTAINER
    ? process.env.DB_HOST
    : "localhost";
const postgresPort = process.env.DB_PORT;
const postgresDb = process.env.DB_NAME;
const dbUrl = `postgres://${postgresUser}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDb}`;

console.log(`dbUrl: ${dbUrl}`);

let sequelize =
    process.env.NODE_ENV != "test"
        ? new Sequelize(dbUrl, {
              dialect: "postgres",
          })
        : new Sequelize({
              dialect: "sqlite",
              storage: "./database.sqlite",
          });

sequelize.sync({ alter: true });

module.exports = { sequelize };
