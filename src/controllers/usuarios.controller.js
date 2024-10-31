const bcrypt = require('bcryptjs');

const { insertUsuario, selectByUsuario, selectById } = require("../models/usuarios.models");

const { createToken } = require('../utils/helpers');




const registro = async (req, res, next) => {

    //encriptar la password
    req.body.password = await bcrypt.hash(req.body.password, 8);

    try {
        const insertId = await insertUsuario(req.body);
        if (!insertUsuario) {
            return res.status(400).json({ message: 'Fallo en la creacion de un nuevo usuario' });
        }
        const usuario = await selectById(insertId);
        res.status(201).json(usuario);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        //¿existe el email en la base de datos?
        const usuario = await selectByUsuario(username);
        if (!usuario) {
            return res.status(401).json({ message: 'Error en usuario y/o contraseña 1 ' })
        }
        //¿coinciden las password?
        const samePassword = await bcrypt.compare(password, usuario.password);

        if (!samePassword) {
            return res.status(401).json({ message: 'Error en usuario y/o contraseña' });
        }
        res.json({
            message: 'Login correcto 🥳',
            token: createToken(usuario)
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    registro, login
}


