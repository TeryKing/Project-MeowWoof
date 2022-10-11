const sequelize = require('../config/connection');
const { Animal, User } = require('../models');

const animalSeedData = require('./animalSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

//   const readers = await Reader.bulkCreate(readerSeedData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const { id } of readers) {
//     const newCard = await LibraryCard.create({
//       reader_id: id,
//     });
//   }

//   for (const book of bookSeedData) {
//     const newBook = await Book.create({
//       ...book,
//       reader_id: readers[Math.floor(Math.random() * readers.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();
