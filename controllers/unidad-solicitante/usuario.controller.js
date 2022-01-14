const con = require("../../server/config");
const bcrypt = require('bcrypt');
const getPdf = require('../../pdf');


const postPersonUser = async (req, res) => {
    var params = req.body;
    const query = {
        //text: "INSERT INTO seg_persona(nombres, apellido_paterno, apellido_materno, tipo_documento, numero_documento, usucre, correo) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        text: "select contrataciones.add_new_usuario($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        values: [
            params.nombres,
            params.apellido_paterno,
            params.apellido_materno,
            params.tipo_documento,
            params.numero_documento,
            params.correo,
            params.login,
            bcrypt.hashSync(params.password, 10),
            params.id_grupo,
            params.id_direccion,
            params.dep_trabajo,
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result.rows[0],
            })
        )
        .catch((e) => console.error(e.stack));

};

const getGrupo = async (req, res) => {
    const response = await con.query("select * from  public.seg_grupo where grupo='{1}' ");
    res.status(200).json(response.rows);
};

const getListado = async (req, res) => {
    const response = await con.query('select a.id_usuario, b.id_persona, b.correo, a.login, a.id_grupo, b.nombres, b.apellido_paterno, b.apellido_materno, c.descripcion, d.detalle, d.sigla from seg_usuario a, seg_persona b, seg_grupo c, direcciones d where a.id_persona = b.id_persona and a.id_grupo = c.id_grupo and a.id_direccion = d.id_direccion and  a.id_direccion is not null order by a.id_usuario desc');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`select a.id_usuario, b.id_persona, b.correo, a.login, a.id_grupo, b.nombres, b.apellido_paterno, 
                                        b.apellido_materno, c.descripcion, d.detalle, d.sigla
                                        from seg_usuario a, seg_persona b, seg_grupo c, direcciones d
                                        where a.id_persona = b.id_persona 
                                        and b.id_persona=${id}
                                        and a.id_grupo = c.id_grupo
                                        and a.id_direccion = d.id_direccion
                                        and  a.id_direccion is not null order by a.id_usuario desc`);
    res.status(200).json(response.rows);
};

const getNumeroDocumento = async (req, res) => {
    var params = req.body;
    const query = {
        text: "select * from seg_persona where numero_documento=$1",
        values: [
            params.numero_documento
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result.rows[0],
            })
        )
        .catch((e) => console.error(e.stack));
}

const getUsername = async (req, res) => {
    var params = req.body;
    const query = {
        text: "select * from public.seg_usuario where login=$1",
        values: [
            params.login
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result.rows[0],
            })
        )
        .catch((e) => console.error(e.stack));
}

const getUsuario = async (req, res) => {
    var id = req.params.id;
    const response =
        await con.query(`select * from seg_usuario where id_usuario=${id}`);
    res.status(200).json(response.rows);
};

const getPersona = async (req, res) => {
    var id = req.params.id;
    const response =
        await con.query(`select * from seg_persona where id_persona=${id}`);
    res.status(200).json(response.rows);
};

const putUser = async (req, res) => {
    var id = req.params.id;
    var params = req.body;

    const query = {
        text: `UPDATE public.seg_usuario SET login=$1, password=$2, id_direccion=$3, id_grupo=$4, usucre=$5, dep_trabajo=$6 WHERE id_usuario=${id}`,
        values: [
            params.login,
            bcrypt.hashSync(params.password, 10),
            params.id_direccion,
            params.id_grupo,
            params.usucre,
            params.dep_trabajo
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result,
            })
        )
        .catch((e) => console.error(e.stack));
};

const putUser2 = async (req, res) => {
    var id = req.params.id;
    var params = req.body;
    const query = {
        text: `UPDATE public.seg_persona SET nombres=$1, apellido_paterno=$2, apellido_materno=$3, numero_documento=$4, correo=$5, tipo_documento=$6 WHERE id_persona=${id}`,
        values: [
            params.nombres,
            params.apellido_paterno,
            params.apellido_materno,
            params.numero_documento,
            params.correo,
            params.tipo_documento
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result,
            })
        )
        .catch((e) => console.error(e.stack));
};

const putUser3 = async (req, res) => {
    var id = req.params.id;
    var params = req.body;
    const query = {
        text: `UPDATE public.seg_persona SET 
        nombres=(UPPER($1)), apellido_paterno=(UPPER($2)), apellido_materno=(UPPER($3)), numero_documento=(UPPER($4)), nacionalidad=(UPPER($5)), 
        lugar_nacimiento=(UPPER($6)), tipo_documento=(UPPER($7)), correo=$8, celular=$9, direccion=(UPPER($10)), zona=(UPPER($11)), 
        extension_documento=$12, ciudad=(UPPER($13)), telefono=$14
        WHERE id_persona=${id}`,
        values: [
            params.nombres,
            params.apellido_paterno,
            params.apellido_materno,
            params.numero_documento,
            params.nacionalidad,
            params.lugar_nacimiento,
            params.tipo_documento,
            params.correo,
            params.celular,
            params.direccion,
            params.zona,
            params.extension_documento,
            params.ciudad,
            params.telefono
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result,
            })
        )
        .catch((e) => console.error(e.stack));
};
//pdf TDR
const pdf = async (req, res) => {
    var params = req.body;
    const response = await getPdf.generarReporte(params.datos)
    //res.send({ base64: response, mimetype: 'application/pdf' });
    res.status(200).json(response);
};
//pdf TDR ENCUESTA EH2021
const pdfEH2021 = async (req, res) => {
    var params = req.body;
    const response = await getPdf.generarReporteEH2021(params.datos)
    //res.send({ base64: response, mimetype: 'application/pdf' });
    res.status(200).json(response);
};
//pdf TDR AUXILIAR4 ENCUESTA EH2021
const pdfAuxEH2021 = async (req, res) => {
    var params = req.body;
    const response = await getPdf.generarReporteAuxEH2021(params.datos)
    //res.send({ base64: response, mimetype: 'application/pdf' });
    res.status(200).json(response);
};
//pdf TDR SUPERVISOR DE CAMPO EH2021
const pdfSupervisorEH2021 = async (req, res) => {
    var params = req.body;
    const response = await getPdf.generarTDREncuestadorEH2021(params.datos)
    //res.send({ base64: response, mimetype: 'application/pdf' });
    res.status(200).json(response);
};
//pdf contratos
const pdfContrato = async (req, res) => {
    var params = req.body;
    const response = await getPdf.generarContrato(params.datos)
    res.status(200).json(response);
};

module.exports = {
    getGrupo,
    getNumeroDocumento,
    getUsername,
    getListado,
    getUsuario,
    getPersona,
    putUser,
    putUser2,
    putUser3,
    postPersonUser,
    getUserById,
    pdf,
    pdfEH2021,
    pdfSupervisorEH2021,
    pdfContrato,
    pdfAuxEH2021
};



