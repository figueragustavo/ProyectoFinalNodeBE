require("dotenv").config();
const express = require("express");
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const secret = 'mysecret';

const mysql = require('mysql2');

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DATABASE);

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    insecureAuth : true
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, hash], (err, result) => {
      if (err) {
        console.error('Error inserting user into database: ' + err.stack);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(201).send('User created successfully');
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user from database: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('Username or password incorrect');
      return;
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing password: ' + err.stack);
        res.status(500).send('Internal server error');
        return;
      }
      if (!result) {
        res.status(401).send('Username or password incorrect');
        return;
      }
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
});
