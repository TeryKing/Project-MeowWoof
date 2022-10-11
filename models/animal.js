const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Animal extends Model {}

Animal.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    assigned_volunteer: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "animal",
  }
);
module.exports = Animal;
