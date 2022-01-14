const bcrypt = require('bcrypt');
const con = require("../server/config");
const jwt = require('jsonwebtoken');
const CADUCIDAD_TOKEN = require('../config/config').CADUCIDAD_TOKEN;
const SEED = require('../config/config').SEED;

const signup = async (req, res) => {
    var params = req.body;
    const query = {
        text: 'INSERT INTO usuarios(id_grupo, id_gestion, id_direccion, estado, nombre_completo, login, password, notifica_correo, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        values: [params.id_grupo, params.id_gestion, params.id_direccion,
        params.estado, params.nombre_completo, params.login, bcrypt.hashSync(params.password, 10), params.notifica_correo, params.created_at, params.updated_at]
    }
    await con.query(query)
        .then(result => res.status(200).json({
            query, result
        }))
        .catch(e => console.error(e.stack))
}


const signin = async (req, res) => {
    console.log(req.body);
    if (!req.body.usuario || !req.body.password) {
        res.status(400).json({ msg: 'Por favor introduzca el Usuario y Contraseña' })
    } else {
        const query = {
            text: 'SELECT login, password, id_grupo, id_usuario FROM seg_usuario WHERE login=$1',
            values: [req.body.usuario],
        }
        await con.query(query, (err, result) => {
            if (err) throw err
            if (result.rowCount == 0) return res.status(400).json({ msg: 'Usuario no válido' })
            if (!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
                console.log(req.body.password);
                console.log(result.rows[0].password);
                console.log(bcrypt.compareSync(req.body.password, result.rows[0].password));
                return res.status(400).json({ msg: 'Contraseña no válida' })
            }

            let generador = result.rows[0];
            delete generador.password;
            let token = jwt.sign({
                usuario: generador
            }, SEED, { expiresIn: CADUCIDAD_TOKEN });

            return res.status(200).json({
                res: result.rows[0],
                token
            })
        })

    }
}

const verificaToken = (req, res) => {
    const { token } = req.headers; // agarra el token del header
    var payload = jwt.decode(token, SEED); //decodifica el token
    const { usuario } = payload; // obtiene usuario del token
     res.json({
        usuario,
        token
    })
}

module.exports = {
    signin,
    signup,
    verificaToken
};
