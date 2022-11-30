const config = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);

db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  DataTypes
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
