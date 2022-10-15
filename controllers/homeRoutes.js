const router = require('express').Router();
const { NIL } = require('uuid');
const { Animal, User } = require('../models');
//Middleware
const checkAuth = require('../utils/checkAuth');

// the homepage
//it will render a random animal to be the pet of the day
router.get('/',  async (req, res) => {
  try {
    const animalData = await Animal.findAll(
        {   raw: true,
            nest: true,
        }
    );

    const randomAnimal = animalData[Math.floor(Math.random() * animalData.length)];
    console.log(randomAnimal);
    
    res.render('homepage', { 
      randomAnimal,
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
      const breeds = animalData.map((animal)=>
        animal.breed
      )
      breeds.sort();
      const uniquebreeds = [...new Set([...breeds])]
        
      const genders = animalData.map((animal)=>
      animal.gender
    ) 
    const uniquegenders = [...new Set([...genders])]

      const ages = animalData.map((animal)=>
          animal.age
      )
      ages.sort()
      const uniqueages = [...new Set([...ages])]

      const sizes = animalData.map((animal)=>
          animal.size
      )
      sizes.sort()
      const uniquesizes = [...new Set([...sizes])]

      res.render('search', { 
        animalData, 
        uniquegenders,
        uniqueages,
        uniquesizes,
        uniquebreeds,
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
    // const filterResults = async (event) =>
    // event.preventDefault();
  
    // document.querySelector('#dog').addEventListener('checkbox',filterResults);
    // document.querySelector('#cat').addEventListener('checkbox',filterResults);
    // const species = document.querySelector('#species').value;

    // const dog
    // const gender = document.querySelector('#gender').value;
    // const breed = document.querySelector('#breed').value.trim();
    // const age = document.querySelector('#age').value;
    // const size = document.querySelector('#size').value;

    // if (species) {
    //   const response = await fetch('/results', {
    //     method: 'GET',
        
    //   });
    // }
  
  // document
  //   .querySelector('#applyfilter')
  //   .addEventListener('button', filterResults);

        console.log(req.query.species)
        console.log(req.query.breed)
        console.log("yeet", req.query) 
        const where = {
          ...(req.query.breed && {breed: req.query.breed}),
          ...(req.query.species && {species: req.query.species}),
          ...(req.query.age && {age: req.query.age}),
          ...(req.query.gender && {gender: req.query.gender}),
          ...(req.query.size && {size: req.query.size})

        }
        console.log(where);
        const animalData = await Animal.findAll({where,raw: true});
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
          res.json({animalData})
        // res.render('filter', { 
        //   animalData, 
        //   logged_in: req.session.logged_in   
        // });
        
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
      }
});

//when the user clicks on one of the animals, it will render that animal by using its id
//add middleware
router.get('/animal/:animal_id',  async (req, res) => {
  try{
      const animalID = await Animal.findByPk(req.params.animal_id, 
          {   
              raw: true,
              nest: true,
          }
      );
      res.status(200).json(animalID);
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


// add middleware
router.get('/dashboard/',  async (req, res) => {
  try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk("8c464600-4b61-11ed-a035-51544ac70a62", {
        raw: true,
        attributes: { exclude: ['password'] }
      });
      const assignedAnimals = await Animal.findAll({
        where: {
          assigned_volunteer: "8c464600-4b61-11ed-a035-51544ac70a62"
        },
        raw: true
      }
      )
      const unassignedCats = await Animal.findAll({
        where: {
          species: 'Cat',
          assigned_volunteer: null
        },
        raw: true
      }
      )
      const unassignedDogs = await Animal.findAll({
        where: {
          species: 'Dog',
          assigned_volunteer: null
        },
        raw: true
      }
      )
  console.log(unassignedCats, unassignedDogs)
  
      // res.status(200).json(userData);
      //must be commented out until we have the routes and handlebars working
      res.render('volunteer', {
        assignedAnimal: assignedAnimals,
        user: userData,
        dogs: unassignedDogs,
        cats: unassignedCats,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

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