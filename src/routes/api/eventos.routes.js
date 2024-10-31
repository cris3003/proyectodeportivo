const router = require('express').Router();

const { selectAllEvents, selectByIdEvents, createEvents, updateEvento, deleteEvento } = require('../../controllers/eventos.controllers');




router.get('/', selectAllEvents);
router.get('/:eventos', selectByIdEvents);
router.post('/', createEvents);
router.put('/:eventoId', updateEvento);
router.delete('/:eventoId', deleteEvento);


module.exports = router;