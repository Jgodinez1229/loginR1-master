var express = require('express');
var router = express.Router();
const UsersModel = require("../models/users");

/* GET home page. */
router.get('/', function(req, res, next) {
  // Aquí puedes utilizar el modelo de MongoDB para realizar consultas
  // Por ejemplo, encontrar todos los usuarios y enviarlos como respuesta
  UsersModel.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(users);
  });
});

module.exports = router;
