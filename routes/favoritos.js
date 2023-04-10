const express = require("express");
const { registerFav, getFavoritos } = require("../controllers/favoritos")
const router = express.Router();

router.post("/addFav", registerFav);

router.post("/getFavByUser", getFavoritos);

module.exports = router;