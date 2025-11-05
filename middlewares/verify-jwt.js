const { response } = require('express');
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // console.log({ uid, name });

        req.uid = uid;
        req.name = name;

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    next();
}

module.exports = {
    verifyJWT
};