const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: "Image URL must be a valid URL" },
      isImageUrl(value) {
        if (value && !value.match(/\.(jpg|jpeg|png|gif)$/i)) {
          throw new Error("Image URL must end with .jpg, .jpeg, .png or .gif");
        }
      },
    },
  },
}, {
  timestamps: true,
});


module.exports = User;
