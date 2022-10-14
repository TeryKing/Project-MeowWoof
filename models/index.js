const User = require("./User");
const Animal = require("./Animal");

User.hasMany(Animal, {
    foreignKey: 'user_id',
});

// Animal.belongsTo(User, {
//     foreignKey: 'animal_id',
// });

module.exports = { User, Animal };
