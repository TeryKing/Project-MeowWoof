const router = require('express').Router();
const { Animal, User } = require('../models');
const checkLogin = require('../utils/checkLogin');

// the homepage
//Goal: render all the blogs. Needs the checkLogin middleware to seee if the user is logged in (if not the browser will be redirected to login screeen)
//put the middleware back in
router.get('/', async (req, res) => {
    // console.log("****1**")
  try {
    // console.log("***2***")

    const animalData = await Animal.findAll(
        {   raw: true,
            nest: true,
            // include: [
            //     { 
            //         model: User,
            //         attributes: ['name'], 
            //     }
            // ],
        }
    );
      // console.log(blogData)

    // Serialize data so the template can read it
    // console.log("***4***")

    //temporaily use this
    res.status(200).json(animalData);

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   blogData, 
    //   logged_in: req.session.logged_in   
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});