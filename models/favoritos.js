const { sequelize } = require("../config/mysql")
const { DataTypes, Sequelize } = require("sequelize");

const Favorito = sequelize.define(
  'favorito', 
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

  );

  module.exports = Favorito;  

