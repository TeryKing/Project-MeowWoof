const router = require('express').Router();
const { NIL } = require('uuid');
const { Animal, User } = require('../models');
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
      logged_in: req.session.logged_in,
      volunteer: req.session.is_volunteer
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Rendering all the animals inside the search. 
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
          console.log({ 
            logged_in: req.session.logged_in,
            volunteer: req.session.is_volunteer   
          })
      res.render('search', { 
        animalData: animalData.map((it)=>{
          return {...it,logged_in:req.session.logged_in}
        }), 
        uniquespecies,
        uniquebreeds,
        uniquegenders,
        uniqueages,
        uniquesizes,
        logged_in: req.session.logged_in,
        volunteer: req.session.is_volunteer   
      });



  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//this page displays the users preference in animals after hitting the apply filter button
router.get('/results', async (req, res) => {
  try {

    const where = {
      ...(req.query.species && { species: req.query.species }),
      ...(req.query.breed && { breed: req.query.breed }),
      ...(req.query.gender && { gender: req.query.gender }),
      ...(req.query.age && { age: req.query.age }),
      ...(req.query.size && { size: req.query.size })

    }

    const animalData = await Animal.findAll({ raw: true, where });

    res.render('results', {
      animalData: animalData.map((it)=>{
        return {...it,logged_in:req.session.logged_in}
      }),
      volunteer: req.session.is_volunteer
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Display animals that assign to the volunteer and gets all unassigned animals
router.get('/dashboard', async (req, res) => {
  if(req.session.is_volunteer === true){
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] }
      });
  
      const user = userData.get({ plain: true });
  
      const assignedAnimalsData = await Animal.findAll({
        where: {
          assigned_volunteer: userData.user_id
        },
        raw: true
      })
  
      const unassignedAnimalsData = await Animal.findAll({
        where: {
          assigned_volunteer: null
        },
        raw: true
      })
  
      res.render('volunteer', {
        ...user,
        unassignedAnimalsData,
        assignedAnimalsData,
        logged_in: true,
        volunteer: req.session.is_volunteer
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    res.redirect("/")
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/'); 
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


router.get('/surrender', async (req, res) => {
  try {
    res.render('surrender', {
      logged_in: req.session.logged_in, 
      volunteer: req.session.is_volunteer
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;