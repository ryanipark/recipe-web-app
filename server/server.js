/* * * * * * * * * * * * * * *     NPM/NODE UTILITY     * * * * * * * * * * * * * * */
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cors = require('cors');

/* * * * * * * * * * * * * * *     LOCAL UTILITY     * * * * * * * * * * * * * * */
const { dbConnect } = require('./databaseUtil');

/* * * * * * * * * * * * * * *     SERVER SETTINGS     * * * * * * * * * * * * * * */
const app = express();
const port = 3000;

/* * * * * * * * * * * * * * *     MIDDLEWARE     * * * * * * * * * * * * * * */
app.use(cors({
  origin: 'http://146.190.164.153:3001',
  credentials: true,
}));

app.use(session({
  store: new SQLiteStore({
    db: 'sessions.db',
    table: 'sessions',
    dir: './',
    concurrentDB: true
  }),
  secret: 'recipeX',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // Will expire login after 1hr
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* * * * * * * * * * * * * * *      API     * * * * * * * * * * * * * * */

/*
 *  Handles users logins
 *    If a users infromation is correct
 *    It will set the session variable
 *
 *  * * * * * */
app.post('/api/login', (req, res) => {

  // Establish database connection
  const db = dbConnect()

  // Grab parameters from request
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Cant find username/password' });
  }

  // Check for user/password and handle accordingly
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Error finding username' });
    }

    if (!user) {
      console.log(`LOGIN: Someone tried to login with username: "${username}"`);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password_hash.toString(), (err, result) => {
      if (err) {
        console.log(user);
        console.error(err.message);
        return res.status(500).json({ message: 'Error checking password' });
      }

      if (result === true) { // If username is found and password matches set sesssion and confirm
        req.session.user = user;
        console.log(req.session.user)
        console.log("user logged")
        console.log(`LOGIN: User "${username}", has logged in succesfully.`);
        return res.status(200).json({ message: 'Login successful' });
      }
      console.log(`LOGIN: "${username}" failed to login, wrong password.`);
      return res.status(401).json({ message: 'Cant find username/password' });
    });
  });

  // After returning close database connection
  db.close()
});

/*
 *  Checks if a user is validated
 *    If a users session variable is set
 *    Return the session variable user
 *
 *  * * * * * */
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  }

  return res.status(401).json({ message: 'Unable to authorize' });
});


app.listen(port, () => {
  console.log(`SERVER: Listening on port ${port}`);
});
