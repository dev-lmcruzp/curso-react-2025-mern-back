const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { genereteJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                ok: true,
                msg: 'El correo ya ha sido registrado'
            });
        }

        const newUser = new User(req.body);
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(newUser.password, salt);
        await newUser.save();

        const token = await genereteJWT(newUser.id, newUser.name)

        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                ok: true,
                msg: 'El usuario no existe'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(400).json({
                ok: true,
                msg: 'Contraseña incorrecto'
            });
        }

        const token = await genereteJWT(user.id, user.name)
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }

};

const refreshToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await genereteJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    login,
    createUser,
    refreshToken
}