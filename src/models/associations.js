const User = require("./User");
const Accommodation = require("./Accommodation");

User.hasMany(Accommodation, { foreignKey: 'userId', onDelete: 'CASCADE' });

Accommodation.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

