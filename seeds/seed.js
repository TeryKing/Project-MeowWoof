const sequelize = require('../config/connection');
const { Animal, User } = require('../models');

const userSeedData = require('./userSeedData.json');
const animalSeedData = require('./animalSeedData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Animal.bulkCreate(animalSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
