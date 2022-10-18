const router = require('express').Router();
const { Animal } = require('../../models');
const checkAuth = require('../../utils/checkAuth');

//Add animal when the pet is getting surrender
router.post('/',async (req, res) => {
    try {

      const newAnimal = await Animal.create({
      ...req.body,
  
      });

      res.status(200).json(newAnimal);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //delete animal when its adopted => press adopted btn (it will remove the animal from the db)
  router.delete('/:animal_id', async (req, res) => {
    try {
      const animalData = await Animal.destroy({
        where: {
          animal_id: req.params.animal_id,
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

//dashboard specifally in the aside of the unassigned animals
//updates animal info
//the voluteer id is hard coded to the current user id
router.put('/:animal_id/current_user', async (req, res) => {
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
          assigned_volunteer: req.session.user_id,
        },
        {
          where: {
            animal_id: req.params.animal_id,
          },
        }
      );

    
    res.status(200).json(updateAnimal);
  } catch (err) {
    res.status(500).json(err);
  }
})
//volunteer id comes from the body (use this when you want to reassign the animal to someone else that is not the current user)
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


        
      res.status(200).json(updateAnimal);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  
  module.exports = router;