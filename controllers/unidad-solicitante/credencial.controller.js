const con = require("../../server/config");

const getAllContrato = async (req, res) => {
    const response = await con.query(`
	    SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=a.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
        (SELECT tipo_documento FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
        (SELECT numero_documento FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
        (SELECT extension_documento FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
        b.objeto_contratacion, b.sede_trabajo, c.qr, b.objeto_contratacion, d.cargo
        FROM  contrataciones.formulario_contrataciones a, contrataciones.terminos_referencias b,
        contrataciones.contrato c, postulaciones.pos_cuadro_eq d
        WHERE a.id_termino_referencia = b.id_termino_referencia
        AND a.id_formulario_contratacion = c.id_formulario_contratacion
		AND d.id_cuadro = b.id_cuadro_equivalencia
		
    `);
    res.status(200).json(response.rows);
};

const getAllCredencial = async (req, res) => {
    const response = await con.query(`SELECT * FROM contrataciones.credenciales`);
    res.status(200).json(response.rows);
};

const postCredencial2 = async (req, res) => {
    var params = req.body;
    console.log(params);
    const query = {
        text: `INSERT INTO contrataciones.credenciales (nombres, apellido_paterno, 
                apellido_materno, cargo, numero_documento, extension_documento, objeto_contratacion, qr,
                sede_trabajo, img, usuario, created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING * `,
        values: [
            params.nombres,
            params.apellido_paterno,
            params.apellido_materno,
            params.cargo,
            params.numero_documento,
            params.extension_documento,
            params.objeto_contratacion,
            params.qr,
            params.sede_trabajo,
            params.img,
            params.usuario,
            params.created_at
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
}

const putCredencial2 = async (req, res) => {
    var params = req.body;
    console.log(params);
    const query = {
        text: `UPDATE contrataciones.credenciales
		 SET img=$1 WHERE id_credencial=${params.id_credencial}`,
        values: [
            params.img
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

module.exports = {
    getAllContrato,
    getAllCredencial,
    putCredencial2,
    postCredencial2
};


