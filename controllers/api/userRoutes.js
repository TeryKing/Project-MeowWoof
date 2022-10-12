const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const userDate = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });
  console.log(req.body)
      req.session.save(() => {
        req.session.loggedIn = true;
        console.log(req.session)
  
        res.status(200).json(userDate);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//user logins
router.post('/login', async (req, res) => {

  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });

    if (!findUser) {
      res
        .status(400).json({ message: 'Either the email or password is incorrect' });
      return;
    }

    const validPassword = await findUser.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(500).json({ message: 'Either the email or password is incorrect' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = findUser.user_id;
      req.session.logged_in = true;

      res.json({ user: findUser, message: 'You are logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//user logs out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;