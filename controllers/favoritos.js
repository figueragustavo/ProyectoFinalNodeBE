const { favoritosModel } = require("../models");

const getFavoritos = async(req, res) =>{
    try{
        req = matchedData(req);
        const favorito = await favoritosModel.findAll({where:{
          user_id : req.user_id
        }}).then(res => {
          return res;
        }).catch((error) =>{
          console.error("failed to retrivie data: "+ error);
        });
        const data = {
          favorito
        }
    
        res.send({data})
    
    
      }catch(e){
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER")
      }
}

const registerFav = async (req, res) => {
    try{
      req = matchedData(req);
      const body = { ...req };
      const dataFav = await favoritosModel.create(body);
    
      const data = {
        favorito: dataFav,
      };
      res.status(201)
      res.send({ data });
    }catch(e){
      console.log(e)
      handleHttpError(res, "ERROR_ADD_FAV")
    }
  };

  module.exports = { registerFav, getFavoritos };