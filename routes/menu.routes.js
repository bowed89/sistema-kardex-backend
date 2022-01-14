const { Router } = require('express');
const { getMenu, getMenuById } = require('../controllers/menu.controller');

const router = Router();

router.get('/', getMenu);
router.post('/', getMenuById);


module.exports = router;