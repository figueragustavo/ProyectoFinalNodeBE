const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'mysecret';
const router = express.Router();
const connection = require('../config/mysql')

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password: ' + err.stack);
      res.status(500).send('Internal server error');
      return;
    }
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?)';
    connection.query(query, [email, hash], (err, result) => {
      if (err) {
        console.error('Error inserting user into database: ' + err.stack);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(201).send('User created successfully');
    });
  });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error fetching user from database: ' + err.stack);
        res.status(500).send('Internal server error');
        return;
      }
      if (results.length === 0) {
        res.status(401).send('Email or password incorrect');
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