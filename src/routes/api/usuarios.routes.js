const router = require('express').Router();

const { login, registro } = require('../../controllers/usuarios.controller');
const { checkUsuarioId } = require('../../utils/middlewares')

// router.get();
router.post('/registro', registro);
router.post('/login', login);

module.exports = router;