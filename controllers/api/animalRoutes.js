const router = require('express').Router();
const { Animal } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

//Add animal
//add middleware
router.post('/',async (req, res) => {
    try {
    // console.log("checkpoint 1")

      const newAnimal = await Animal.create({
      ...req.body,
        // user_id: req.session.user_id,
        
      // ...console.log(req.body)
  
      });
      // console.log("checkpoint 2")
  
      // res.render('dashboard', {
      //   newAnimal,
      //   logged_in: req.session.logged_in
      // });
      res.status(200).json(newAnimal);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //delete animal when its adopted
  //add middleware
  router.delete('/:animal_id', async (req, res) => {
    try {
      const animalData = await Animal.destroy({
        where: {
          animal_id: req.params.animal_id,
          // user_id: req.session.user_id,
        },
      });
  
      if (!animalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
      }
  
      res.status(200).json(animalData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//updates animal info
router.put('/:animal_id', async (req, res) => {
    try {
        const updateAnimal = await Animal.update(
            {
              species: req.body.species,
              name: req.body.name,
              gender: req.body.gender,
              breed: req.body.breed,
              age: req.body.age,
              size: req.body.size,
              arrival_date: req.body.arrival_date,
              assigned_volunteer: req.body.assigned_volunteer,
            },
            {
              where: {
                animal_id: req.params.animal_id,
              },
            }
          );
        //comment out for now to see if routes work
        //   return res.json(updateAnimal);
      res.status(200).json(updateAnimal);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  
  module.exports = router;