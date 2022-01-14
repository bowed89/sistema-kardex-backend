const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const con = require("../server/config");
const jwt = require('jsonwebtoken');
//const { verificaToken } = require('../middlewares/autenticacion');

const { loginPost, verificaToken } = require('../controllers/login-ad.controller');
router.post('/signin', loginPost);
router.get('/renew', verificaToken)


module.exports = router;