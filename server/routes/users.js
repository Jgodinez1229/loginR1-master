const express = require('express');
const router = express.Router();
const UsersModel = require("../models/users");

// Ruta para obtener detalles de todos los usuarios
router.get('/all', async function (req, res, next) {
  try {
    const resultado = await UsersModel.find();
    res.json(resultado);
    console.log(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Ruta para crear un nuevo usuario (registro de usuarios)
router.post('/register', async (req, res) => {
  try {
    const nuevoUsuario = new UsersModel({
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: req.body.contraseña
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta para obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await UsersModel.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Ruta para actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
  try {
    const usuarioActualizado = await UsersModel.findByIdAndUpdate(req.params.id, {
      nombre: req.body.nombre,
      email: req.body.email,
      contraseña: req.body.contraseña
    }, { new: true });
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
