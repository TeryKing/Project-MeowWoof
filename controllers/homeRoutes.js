const router = require('express').Router();
const { Animal, User } = require('../models');
//Middleware
const checkAuth = require('../utils/checkAuth');

// the homepage
//Goal: render all the animals. 
router.get('/',  async (req, res) => {
  try {
    const animalData = await Animal.findAll(
        {   raw: true,
            nest: true,
            
        }
    );
    //temporaily use this to see if the route works
    // res.status(200).json(animalData);

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
        const searchAnimals = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
          });
      
        const searchAnimalsDB = searchAnimals.get({ plain: true });
        res.status(200).json(searchAnimalsDB);
        
    } catch (err) {
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
      res.render('animal', {
          animal,
          logged_in: req.session.logged_in
        });

  } catch {
      res.status(500).json(err);
  }
})

//doesn't serve any purpose aside from showing all users
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

router.get('/redirect', (req, res) => {
// If the user is already logged in, redirect the request to another route
//must be commented out until we have the routes and handlebars working
console.log("hit login")
    if (req.session.logged_in) {
        res.redirect('/main');
        return;
    }

    res.render('login');
});

// add middleware
router.get('/surrender/:user_id', async (req, res) => {
    try {
      // redirect to surrender form (only adopters has this)
      const surrender = await User.findByPk(req.params.user_id, {
        attributes: { exclude: ['password'] }
      });
  
      const surrenderForm = surrender.get({ plain: true });
      
      res.status(200).json(surrenderForm);
      //must be commented out until we have the routes and handlebars working
    //   res.render('surrender', {
    //     ...user,
    //     logged_in: true
    //   });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;