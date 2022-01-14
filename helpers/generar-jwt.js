const jwt = require('jsonwebtoken');

const generarJWT = (id_usuario = '', id_personal = '', id_grupo = '') => {
    console.log(id_usuario, ' entra a generarJWT---->');
    return new Promise((resolve, reject) => {

        const payload = { id_usuario, id_personal, id_grupo };

        jwt.sign(payload, process.env.SEED, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                // console.log(err);
                reject('No se pudo generar token')
            } else {
                resolve(token);
            }
        })
    })
};

module.exports = {
    generarJWT
};