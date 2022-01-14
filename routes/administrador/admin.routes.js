const { Router } = require('express');
const { getAllPersonal, updateGrupo, getUsuarioById } = require('../../controllers/administrador/admin.controller');
const router = Router();

router.get('/', getAllPersonal);
router.get('/:id', getUsuarioById);
router.put('/', updateGrupo);

module.exports = router;