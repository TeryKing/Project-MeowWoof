const router = require('express').Router();
const { User } = require('../../models');
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const newUserData = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        is_volunteer: req.body.is_volunteer
      });
      req.session.save(() => {
        req.session.user_id = newUserData.user_id;
        req.session.logged_in = true;
        req.session.is_volunteer = newUserData.is_volunteer;
  
        res.status(200).json(newUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//User login authentication
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
      req.session.user_email = findUser.user_email;
      req.session.user_first_name = findUser.user_first_name;
      req.session.user_id = findUser.user_id;
      req.session.logged_in = true;
      req.session.is_volunteer = findUser.is_volunteer;
      res.json({ user: findUser, message: 'You are logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//User logout function
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/email', async (req, res) => {
  //Try catch with error
  //Use sequelize using the user ID that is stored in the session to then
  
  try {  

    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] }
  });
    const user = userData.get({ plain: true });
    const msg = {
      to: user.email,
      from: "meowwoof.shelter@gmail.com",
      subject: "Adoption Process Initiated",
      text: `
      Hello ${user.first_name}, 
      You have begun the adoption process of one of the beautiful animals from MeowWoof Shelter! We are currently processing your request and reviewing your credentials as a potential adopter. This process usually takes between 5-10 business days depending on our request levels. We are excited that you are beginning the process!

      -Best,
      MeowWoof Family 
      `
      ,
      html: `
      <h3>Hello ${user.first_name},</h3> 
      <p>You have begun the adoption process of one of the beautiful animals from MeowWoof Shelter! We are currently processing your request and reviewing your credentials as a potential adopter. This process usually takes between 5-10 business days depending on our request levels. We are excited that you are beginning the process!<br>
      -Best,</br>
      MeowWoof Family </p>
      `
    }
    sgMail.send(msg)
    console.log('msg', msg)
    res.send()
  } catch (err) {
    res.status(500).json(err);
  }
} )

module.exports = router;