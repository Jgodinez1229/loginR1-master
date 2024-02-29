const mongoose = require('mongoose');

const UsuarioEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    contraseña: {
        type: String,
        required: true,
    }
});
   
module.exports = mongoose.model('usuario', UsuarioEsquema);