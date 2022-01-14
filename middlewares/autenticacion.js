const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

let verificaToken = async(req, res, next) => {
    //let token = req.get('token');
    let token = req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: '¡No existe Token!'
        })
    }
    try {
        await jwt.verify(token, SEED);
        next();     
     } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg: '¡Token no válido!'
        })
     }
};

module.exports = {
    verificaToken
}
