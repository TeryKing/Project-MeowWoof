const router = require('express').Router();
const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');

router.use('/user', userRoutes);
router.use('/animal', animalRoutes);

module.exports = router;