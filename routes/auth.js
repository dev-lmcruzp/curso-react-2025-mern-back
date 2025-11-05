/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { login, createUser, refreshToken } = require('../controllers/auth');
const { verifyJWT } = require('../middlewares/verify-jwt');


const router = Router();

router.post('',
    [
        check('email', 'El correo es obligatorio.').isEmail(),
        check('password', 'La contraseña es obligatorio.').isLength({ min: 6 }),
        fieldValidator
    ],
    login);

router.post(
    '/users',
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El correo es obligatorio.').isEmail(),
        check('password', 'La contraseña es obligatorio.').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);

router.get('/renew', verifyJWT, refreshToken);

module.exports = router;



/// ba6OL0E1tcWmzACs

// isclmcruzp_db_user




// mern_user

// 2iMrwtWFQS37YbPw


// mongodb+srv://mern_user:2iMrwtWFQS37YbPw@clusterdb.hnswipr.mongodb.net/