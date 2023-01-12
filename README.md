# MeowWoof

## Description


This application is designed to help with pet shelters of any size. The major functions of the application include a search function where animals can be filtered by a variety of characteristics, a volunteers dashboard where volunteers can choose from volunteer-less pets to assist, and a surrender functionality where users can surrender any pet for which they feel they cannot adequately care. This application was created using primarily Node.js, JQuery UI, TailwindCSS, Bootstrap, sendgrid,  Mysql, and sequelize. 

## Acceptance Criteria


1. When the user is on the home page, they are presented with a resident spotlight for the day where one animal is presented.
2. On the home page, there is a nav bar where the users can select between a search animals function, a volunteers dashboard, a login form, a signup form, and a surrender form. 
3. On the home page, the user can also see some of the animal residents and are given the option to login/signup if they want to adopt an animal. 
4. When a user attempts to use the volunteer's dashboard or adopt a pet, then are prompted to the login page.
5. When that user is logged in, as a volunteer, on the volunteer's dashboard, they are shown the pets that they are volunteering for if any. Also on this page is a list of all of the pets currently without a volunteer that can be selected and volunteered for. Upon submitting these checked boxes, these pets should register on the section of the page indicating the user is volunteering for them. 
6. When the user is on the search page, they are given a range of criteria to filter the animals by so that they can view and potentially adopt them. 
7. When the user wants to surrender a pet, they are able to press the surrender button on the navigation bar to access the surrender page.
8. Inside the surrender page, the user can fill out information about the pet, then press submit to surrender their pet.
9. That surrendered pet will be placed inside the database and rendered with its own animalcard.

## Installation


This project uses the following npm packages: Node.js, bcrypt, connect-session-sequelize, dotenv, express, express-handlebars, express-session, mysql2, sequelize, and sendgrid. 

In the terminal of the server.js and type this command 

    npm install

This creates package.json file.  Finally, create a .env folder that contains database's name, user, and password, an api key for sendgrid.

## Usage


Before running the application, login into mysql and source the schema 
Type this command in the terminal

    source db/schema.sql 

Then, exit mysql.

Next, seed the database by running this command: 

    node seeds/seed.js

Finally, type this command in the terminal to run the application. 

    nodemon server.js
 


## Screenshot of Application

![Screenshot](./misc/homepagegif.gif)

## Deployed Application

Click [here](https://shielded-harbor-87736.herokuapp.com/) for MeowWoof's live URL.

Click [here](https://github.com/TeryKing/Project-MeowWoof) for our GitHub Repository.



## Authors


- [@Calvin Rhinesmith](https://github.com/crhinesmith)

- [@Kathy Kang](https://github.com/KatSKang)

- [@Melissa Stan](https://github.com/mstan19)

- [@Terry Kim](https://github.com/TeryKing)

- [@Tyler Hudson](https://github.com/Hudson-TD)



## Acknowledgements

    Bcrypt: https://www.npmjs.com/package/bcrypt

    Dotenv: https://www.npmjs.com/package/dotenv

    Express-Session: https://www.npmjs.com/package/express-session

    Express: https://www.npmjs.com/package/express

    Georgia Tech Coding Bootcamp: https://bootcamp.pe.gatech.edu/coding/

    Handlebars: https://handlebarsjs.com/

    Heroku: https://www.heroku.com/home

    MDN : https://developer.mozilla.org/en-US/

    mysql: https://www.npmjs.com/package/mysql

    Node: https://www.npmjs.com/package/node

    NPMJS: https://www.npmjs.com/

    Readme.so: https://readme.so/

    Sendgrid: https://www.npmjs.com/package/@sendgrid/mail

    Sequelize: https://sequelize.org/

    W3Schools: https://www.w3schools.com/

## License

This application does not require any licenses.


## Contributing

If you would like to contribute to this project, please email us at meowwoof.shelter@gmail.com


## Tests

Currently, there are no tests for this project.
