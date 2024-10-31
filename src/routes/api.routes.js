const router = require('express').Router();

router.use('/eventos', require('./api/eventos.routes'));
router.use('/usuarios', require('./api/usuarios.routes'));

module.exports = router;