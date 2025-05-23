process.env.NODE_ENV = "test";
const sequelize = require("../src/config/database");
const User = require("../src/models/User");
const Accommodation = require("../src/models/Accommodation"); 
require("../src/models/associations");


beforeAll(async () => {
  await sequelize.sync({ force: true });
})

afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, User, Accommodation };
