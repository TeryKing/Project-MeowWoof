const router = require('express').Router();
const { NIL } = require('uuid');
const { Animal, User } = require('../models');
//Middleware
const checkAuth = require('../utils/checkAuth');

// the homepage
//it will render a random animal to be the pet of the day
router.get('/', async (req, res) => {
  try {
    const animalData = await Animal.findAll(
      {
        raw: true,
        nest: true,
        attributes: { exclude: ['animal_id', 'arrival_date', 'assigned_volunteer', 'createdAt', 'updatedAt'] }
      }
    );

    const randomAnimal = animalData[Math.floor(Math.random() * animalData.length)];
    console.log(randomAnimal)

    const residentOne = animalData[Math.floor(Math.random() * animalData.length)];
    console.log(randomAnimal)

    const residentTwo = animalData[Math.floor(Math.random() * animalData.length)];
    console.log(randomAnimal)

    const residentThree = animalData[Math.floor(Math.random() * animalData.length)];
    console.log(randomAnimal)

    res.render('homepage', {
      randomAnimal,
      residentOne,
      residentTwo,
      residentThree,
      animalData,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Goal: reder all the animals. 
//add the middleware for login
router.get('/search', async (req, res) => {
  try {
    const animalData = await Animal.findAll(
          {   raw: true,
              nest: true,
              
          }
      );
    const species = animalData.map((animal)=>
      animal.species
    )
    species.sort();
    const uniquespecies = [...new Set([...species])]

      const breeds = animalData.map((animal)=>
        animal.breed
      )
      breeds.sort();
      const uniquebreeds = [...new Set([...breeds])]
        
      const genders = animalData.map((animal)=>
      animal.gender
    )
    const uniquegenders = [...new Set([...genders])]

    const ages = animalData.map((animal) =>
      animal.age
    )
    ages.sort()
    const uniqueages = [...new Set([...ages])]

    const sizes = animalData.map((animal) =>
      animal.size
    )
    sizes.sort()
    const uniquesizes = [...new Set([...sizes])]

      res.render('search', { 
        animalData, 
        uniquespecies,
        uniquebreeds,
        uniquegenders,
        uniqueages,
        uniquesizes,
        logged_in: req.session.logged_in   
      });



  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//this page displays the users preference in animals after hitting the apply filter button
//Needs work
router.get('/results', async (req, res) => {
  try {
    console.log(req.query.species)
    console.log(req.query.breed)
    console.log("yeet", req.query)
    const where = {
      ...(req.query.species && { species: req.query.species }),
      ...(req.query.breed && { breed: req.query.breed }),
      ...(req.query.gender && { gender: req.query.gender }),
      ...(req.query.age && { age: req.query.age }),
      ...(req.query.size && { size: req.query.size })

    }
    // console.log(where);
    const animalData = await Animal.findAll({ raw: true, where });
    // res.json({species: req.query.species, breed: req.query.breed});

    // if(req.query.species && req.query.breed){
    //   const animalData = await Animal.findAll(
    //     {
    //         where: {
    //           species: req.query.species,
    //           breed: req.query.breed
    //           //add

    //         }
    //     })
    // }
    // else if(req.query.species){
    //   const animalData = await Animal.findAll(
    //     {
    //         where: {
    //           species: req.query.species,
    //           //add

    //         }
    //     })
    // }
    // else if(req.query.breed){
    //   const animalData = await Animal.findAll(
    //     {
    //         where: {
    //           breed: req.query.breed
    //           //add
    //         }
    //     })
    // }
    // res.json({ animalData })
    res.render('results', {
      animalData,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//when the user clicks on one of the animals, it will render that animal by using its id
//add middleware
router.get('/animal/:animal_id', async (req, res) => {
  try {
    const animalID = await Animal.findByPk(req.params.animal_id,
      {
        raw: true,
        nest: true,
      }
    );
    // res.status(200).json(animalID);
    //must be commented out until we have the routes and handlebars working
    res.render('animal', {
      animal,
      logged_in: req.session.logged_in
    });

  } catch {
    res.status(500).json(err);
  }
})

//doesn't serve any purpose aside from showing all users
// router.get('/dashboard', checkAuth, async (req, res) => {
//       // Find the logged in user based on the session ID
//       const userData = await User.findAll(
//         {
//           raw: true,
//           nest: true,
//         })

//       res.status(200).json(userData);
//     })

router.get('/dashboard/:user_id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.user_id, {
      attributes: { exclude: ['password'] }
    });

    const assignedAnimalsData = await Animal.findAll({
      where: {
        assigned_volunteer: userData.user_id
      },
    }
    )
    res.status(200).json(assignedAnimalsData)
  } catch{
    res.status(500).json(err);
  }
})

// add middleware/
router.get('/dashboard', async (req, res) => {
      // Find the logged in user based on the session ID
      const userData = await User.findAll(
        {
          raw: true,
          nest: true,
        })

      res.status(200).json(userData);
    })

// add middleware
router.get('/dashboard/:user_id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.user_id, {
      attributes: { exclude: ['password'] }
    });

    const assignedAnimalsData = await Animal.findAll({

      where: {
        assigned_volunteer: userData.user_id

      },
    }
    )
    // const unassignedCatsData = await Animal.findAll({
    //   where: {
    //     species: 'Cat',
    //     assigned_volunteer: null
    //   },
    // }
    // )
    // const unassignedDogsData = await Animal.findAll({
    //   where: {
    //     species: 'Dog',
    //     assigned_volunteer: null
    //   }
    // })
    // const assignedAnimals = assignedAnimalsData.map((assignedAnimal) => assignedAnimal.get({ plain: true }));
   // cant map (loop) through something that is empty. might have to make array first then push onto it after you try and assign the animal
    // const unassignedCats = unassignedCatsData.map((cat) => cat.get({ plain: true }));
    // const unassignedDogs = unassignedDogsData.map((dog) => dog.get({ plain: true }));
    // const user = userData.map((user) => user.get({ plain: true }));
    // const unassignedCats = unassignedCatsData.map((cat) => cat.get({ plain: true }));


    // res.status(200).json(assignedAnimalsData);
    //must be commented out until we have the routes and handlebars working

    res.render('volunteer', {
      assignedAnimalsData,
      dogs: unassignedDogs,
      cats: unassignedCats,
      logged_in: true
    });
  } catch (err) {
    console.log('err',err)
    res.status(500).json(err);
  }
});
//updating the assigned pets user ID, should happen on submit form in dashboard.js or on unassign from your care.
// router.put('/dashboard/',  async (req, res) => {
//   try {
//       const updateAnimal = await Animal.update(
//           {
//             assigned_volunteer: req.body.assigned_volunteer,
//           },
//           {
//             where: {
//               animal_id: req.params.animal_id,
//             },
//           }
//         );
//       //comment out for now to see if routes work
//       //   return res.json(updateAnimal);
//     res.status(200).json(updateAnimal);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/animal');
    return;
  }

  res.render('login');
});

// Signup form
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


// add middleware
router.get('/surrender', async (req, res) => {
  try {
    res.render('surrender');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;