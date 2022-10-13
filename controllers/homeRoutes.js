const router = require('express').Router();
const { Animal, User } = require('../models');
const checkAuth = require('../utils/checkAuth');

// the homepage
//Goal: render all the animals. Needs the checkLogin middleware to see if the user is logged in (if not the browser will be redirected to login screen)
router.get('/',  async (req, res) => {
  try {
    const animalData = await Animal.findAll(
        {   raw: true,
            nest: true,
            
        }
    );
      // console.log(animalData)

    //temporaily use this to see if the route works

    res.render('homepage', { 
      animalData, 
      logged_in: req.session.logged_in   
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when the user enter their perfernces, it will render on the screen 
//add the middleware for login
//NEEDS WORK
router.get('/search', async (req, res) => {
  try {
        // const searchAnimals = await Animal.findAll();

      
        // const searchAnimalsDB = searchAnimals.get({ plain: true });
        // res.status(200).json(searchAnimalsDB);
        res.render('search',{logged_in: req.session.logged_in});
        
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
              // include: [
              //                         { 
              //       model: User,
              //       attributes: ['name'] 
              //     }
  
              // ],
          }
      );
      // res.status(200).json(animalID);
      //must be commented out until we have the routes and handlebars working
      // res.render('animal', {
      //     animal,
      //     logged_in: req.session.logged_in
      //   });

  } catch {
      res.status(500).json(err);
  }
})

router.get('/dashboard',  async (req, res) => {
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
        raw: true,
        nest: true,
        attributes: { exclude: ['password'] }
      });
  console.log(req.params)
  
      res.status(200).json(userData);
      //must be commented out until we have the routes and handlebars working
    //   res.render('dashboard', {
    //     ...user,
    //     logged_in: true
    //   });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
// If the user is already logged in, redirect the request to another route
//must be commented out until we have the routes and handlebars working
    if (req.session.logged_in) {
        res.redirect('/search');
        return;
    }

    res.render('login');
});


// router.get('/search', async (req, res) => {
//   try {
//         // const searchAnimals = await Animal.findAll();

      
//         // const searchAnimalsDB = searchAnimals.get({ plain: true });
//         // res.status(200).json(searchAnimalsDB);
//         res.render('search',{logged_in: req.session.logged_in});
        
//     } catch (err) {
//       console.log(err);
//         res.status(500).json(err);
//       }
// });
// add middleware
router.get('/surrender', async (req, res) => {
    try {
      // res.status(200).json(surrenderForm);
      //must be commented out until we have the routes and handlebars working
      res.render('surrender');
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;