const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
User.init(
  {
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //   Uncomment and adjust length value if we want to set a min password length requirement
      //   validate: {
      //     len: [10],
      //   },
    },
    is_volunteer: {
      type: DataTypes.BOOLEAN,
    },
    assigned_pet: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserdata) {
        newUserdata.password = await bcrypt.hash(newUserdata.password, 10);
        return newUserdata;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    modelName: "user",
  }
);
module.exports = User;
