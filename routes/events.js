/*
    Rutas de Eventos
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { verifyJWT } = require('../middlewares/verify-jwt');
const { fieldValidator } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate')

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')


const router = Router();

router.use(verifyJWT); // Aplica todos los que esten debajo de el

router.get('/', getEvents);

router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de fin es obligatorio').custom(isDate),
        fieldValidator
    ], createEvent);

router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de fin es obligatorio').custom(isDate),
        fieldValidator
    ],
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;