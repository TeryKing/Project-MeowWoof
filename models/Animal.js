const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Animal extends Model {}

Animal.init(
  {

    animal_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    assigned_volunteer: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "animal",
  }
);
module.exports = Animal;
