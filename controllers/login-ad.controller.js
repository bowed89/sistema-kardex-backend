const ActiveDirectory = require('activedirectory2');
const configAD = require('../config/active-directory.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const con = require("../server/config");

const { generarJWT } = require('../helpers/generar-jwt')
var ad = new ActiveDirectory(configAD);

const SEED = require('../config/config').SEED;


const loginPost = async (req, res) => {
    console.log(req.body);
    let username = req.body.login;
    username = (username).replace('@ine.gob.bo', '@ine.gov.bo')
    console.log('username', username);
    await ad.authenticate(username, req.body.password, async function (err, auth) {
        //console.log(username, req.body.password, "destro de active");
        if (err) {
            console.log('ERROR----: ' + JSON.stringify(err));
            res.status(400).json({
                ok: false,
                msg: `Usuario y/o contraseña no son correctos`,
            })
        }
        if (auth) {
            console.log('auth ==> ', auth);
            await verificaUsuario(req, res, username);
            // console.log(user);
        }
    })
}

function verificaUsuario(req, res, users) {
    users = (users).replace('@ine.gov.bo', '@ine.gob.bo')
    console.log('entra a verificaUsuario users ->', users);
    const query = {
        text: `SELECT * FROM sdp_usuario WHERE login=$1`,
        values: [users],
    }
    con.query(query, (err, result) => {
        if (err) { throw err }
        if (result.rowCount > 0) {
            obtieneUsuario(req, res, users)
        } else {
            registraUsuario(req, res, users);
        }
    });
}

function obtieneUsuario(req, res, users) {
    console.log('obtieneUsuario', users);
    users = (users).replace('@ine.gov.bo', '@ine.gob.bo')
    const query = {
        text: 'SELECT * FROM sdp_usuario WHERE login=$1',
        values: [users],
    }
    con.query(query, async (err, result) => {
        if (err) throw err
        let generador = result.rows[0];
        console.log('entra a obtieneUsuario a generador ==>', generador);

        users = (users).replace('@ine.gob.bo', '@ine.gov.bo')
        ad.findUser(users, async function (err, users) {
            const token = await generarJWT(generador.id_usuario, generador.id_personal, generador.id_grupo);
            console.log('token', token);
            if (result.rowCount == 0) {
                return res.status(400).json('error')
            }
            //console.log(User);
            return res.status(200).json({
                message: true,
                users,
                id_grupo: generador.id_grupo,
                id_pesonal: generador.id_personal,
                id_usuario: generador.id_usuario,
                token,
            })
        })
    })
}

function registraUsuario(req, res, users) {
    let query;
    users = (users).replace('@ine.gob.bo', '@ine.gov.bo')
    console.log('entra a registraUsuario ==> ', users);// debe entrar con @ine.gov.bo
    ad.findUser(users, async function (err, user) {
        if (err) { throw err }
        console.log('users de registraUsuario!', user);
        let arra = []
        for (let i in user) {
            arra.push(user[i])
        }
        console.log('apellido ===>', arra[8]); // obtiene el apellido
        console.log('nombre ===>', arra[9]); // obtiene el nombre
        console.log('email ===>', arra[4]); // obtiene el email
        let apellidos = (arra[8]).split(" ");
        query = {
            text: "SELECT public.add_new_usuario($1,$2,$3,$4,$5,$6)",
            values: [
                arra[9],
                apellidos[0],
                apellidos[1],
                '4',
                arra[4],
                bcrypt.hashSync(req.body.password, 10)
            ],
        };
        con.query(query, (err, result) => {
            if (err) {
                throw err;
            } else {
                obtieneUsuario(req, res, users);
            }
        })
    })
}

const verificaToken = (req, res) => {
    const { token } = req.headers; // agarra el token del header
    console.log('token', token);
    var payload = jwt.decode(token, SEED); //decodifica el token
    console.log('payload', payload);
    const { id_grupo, id_usuario, id_personal } = payload; // obtiene usuario del token
    res.json({
        id_usuario,
        id_personal,
        id_grupo,
        token
    })
}


module.exports = {
    loginPost,
    verificaToken
}
