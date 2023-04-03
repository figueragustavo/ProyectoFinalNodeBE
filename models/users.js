const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./db');

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return token;
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const authenticateUser = async (email, password) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) {
    throw new Error('User not found');
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }
  const token = generateToken(user);
  return { user, token };
};

module.exports = { authenticateUser };
