

const { selectAll, selectById, insertEvents, updateById, deleteById } = require('../models/eventos.models')

const selectAllEvents = async (req, res, next) => {
    try {
        const result = await selectAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
}
const selectByIdEvents = async (req, res, next) => {
    const { eventos } = req.params;
    const evento = await selectById(eventos);
    if (!evento) {
        return res.status(404).json({ message: 'El evento no existe' });
    }
    res.json(evento);
}
const createEvents = async (req, res, next) => {
    try {
        const result = await insertEvents(req.body);
        if (result === -1) {
            return res.status(400).json({ message: 'La inserción no se ha realizado' });
        }
        const evento = await selectById(result);
        res.json(evento);
    } catch (error) {
        next(error);
    }
}
const updateEvento = async (req, res, next) => {
    const { eventoId } = req.params;
    try {
        const result = await updateById(eventoId, req.body);
        if (result.affectedRows !== 1) {
            return res.status(400).json({ message: 'No se ha realizado la actualización' });
        }
        const evento = await selectById(eventoId);
        res.json(evento);
    } catch (error) {
        next(error);
    }
}
const deleteEvento = async (req, res, next) => {
    const { eventoId } = req.params;
    try {
        const evento = await selectById(eventoId);
        await deleteById(eventoId);
        res.json(evento);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    selectAllEvents, selectByIdEvents, createEvents, updateEvento, deleteEvento
}