const { sequelize } = require("../config/mysql")
const { DataTypes, Sequelize } = require("sequelize");

const Movie = sequelize.define('movie', {
    title: Sequelize.STRING,
    director: Sequelize.STRING,
    genre: Sequelize.STRING,
    url: Sequelize.STRING
  });

  module.exports = Movie;  

