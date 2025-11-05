const { response, request } = require('express');
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find({ user: req.uid })
            .populate('user', 'name email');
        res.json({
            ok: true,
            events
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

const createEvent = async (req, res = response) => {
    try {
        const event = new Event(req.body);
        event.user = req.uid;
        const newEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: newEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

const updateEvent = async (req = request, res = response) => {
    try {
        const { id: eventId } = req.params;
        const event = await Event.findById(eventId);
        const uid = req.uid;

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes permiso para editar este recurso.'
            });
        }

        const newEvent = { ...req.body, user: uid };
        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updateEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

const deleteEvent = async (req = request, res = response) => {
    try {
        const { id: eventId } = req.params;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes permiso para eliminar este recurso.'
            });
        }

        await Event.findByIdAndDelete(eventId);
        res.status(204).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}