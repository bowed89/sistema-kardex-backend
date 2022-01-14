const con = require("../../server/config");

const getAllPoa = async (req, res) => {
    const response = await con.query(`	
    SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
    (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
    (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
    d.id_termino_referencia, b.id_formulario_contratacion, a.id_certificacion_poa, a.fecha_solicitud, 
    a.accion_corto_plazo, a.resultado_esperado, i.login,
    a.operacion, a.tdr, a.fuc, a.hoja_vida, d.objeto_contratacion,e.detalle, h.sigla,e.fuente_fin, e.organismo_fin
    FROM contrataciones.certificacion_poa a, contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
    contrataciones.proyectos e, direcciones h, seg_usuario i
    WHERE a.id_formulario_contratacion = b.id_formulario_contratacion
    AND b.id_termino_referencia = d.id_termino_referencia
    AND d.id_proyecto = e.id_proyecto
    AND d.id_usuarios = i.id_usuario
    AND i.id_direccion = h.id_direccion 

    `);
    res.status(200).json(response.rows);
};

const getReqFucviaPoaId = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT 
        (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT correo FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT celular FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        b.forma_adjudicacion, b.metodo_seleccion_adjudicacion, d.cargo, 
        d.sueldo, c.objeto_contratacion, c.fecha_inicio, c.meses_contrato, c.dias_contrato, e.gestion, f.hr, f.cite, f.documentos_presentar
        FROM contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias c, 
        postulaciones.pos_cuadro_eq d, contrataciones.gestiones e, contrataciones.nota_adjudicacion f 
        WHERE b.id_termino_referencia = c.id_termino_referencia
        AND c.id_cuadro_equivalencia = d.id_cuadro
        AND c.id_gestion = e.id_gestion
        AND b.id_formulario_contratacion = f.id_formulario_contratacion
        AND f.id_nota_adjudicacion = ${id}
`);
    res.status(200).json(response.rows);
};

const getMenu = async (req, res) => {
    var params = req.body.id;
    const response = await con.query(`SELECT label, icon, router FROM contrataciones.menu WHERE grupo = ${params}`);
    res.status(200).json(response.rows);
};

const getMenuAll = async (req, res) => {
    const response = await con.query(`SELECT label, icon, router FROM contrataciones.menu`);
    res.status(200).json(response.rows);
};

/* obtener datos de la hoja de vida */
const getCursoSeminario = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(` select * from postulaciones.pos_cursos_seminarios where id_usuario= ${id}`);
    res.status(200).json(response.rows);
};
const getCursoSeminarioEsp = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(` select * from postulaciones.pos_cursos_seminarios_esp where id_usuario= ${id}`);
    res.status(200).json(response.rows);
};
const getExperiencia = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(` select * from postulaciones.pos_experiencia where id_usuario= ${id}`);
    res.status(200).json(response.rows);
};
const getExperienciaEsp = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(` select * from postulaciones.pos_experiencia_esp where id_usuario = ${id}`);
    res.status(200).json(response.rows);
};
const getExperienciaGral = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`select * from postulaciones.pos_experiencia_gral where id_usuario= ${id}`);
    res.status(200).json(response.rows);
};
const getFormacionAc = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`select * from postulaciones.pos_formacion_academica where id_usuario = ${id}`);
    res.status(200).json(response.rows);
};
const getIdiomas = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`select * from postulaciones.pos_idiomas where id_usuario= ${id}`);
    res.status(200).json(response.rows);
};
const getCuadroEq = async (req, res) => {
    const response = await con.query(`select * from postulaciones.pos_cuadro_eq`);
    res.status(200).json(response.rows);
};
const getCuadroId = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`select * from postulaciones.pos_cuadro_eq where id_cuadro=${id}`);
    res.status(200).json(response.rows);
};
const putCuadroEq = async (req, res) => {
    var id = req.params.id;
    var params = req.body;

    const query = {
        text: `UPDATE postulaciones.pos_cuadro_eq 
                SET cargo=$1, formacion=$2, expgen_anio=$3, expgen_mes=$5, expesp_anio=$4, expesp_mes=$6, 
                cursos=$7, titulo_expgeneral=$8, titulo_expespecifica=$9, nivel_salarial=$10, sueldo=$11
                WHERE id_cuadro=${id}`,
        values: [
            params.cargo,
            params.formacion,
            params.expgen_anio,
            params.expgen_mes,
            params.expesp_anio,
            params.expesp_mes,
            params.cursos,
            params.titulo_expgeneral,
            params.titulo_expespecifica,
            params.nivel_salarial,
            params.sueldo
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

const postCuadroEq = async (req, res) => {
    var params = req.body;
    const query = {
        text: `INSERT INTO postulaciones.pos_cuadro_eq 
        (id_cuadro, cargo, formacion, expgen_anio, expgen_mes, expesp_anio, expesp_mes, cursos, apiestado, usucre, feccre, titulo_expgeneral, titulo_expespecifica, nivel_salarial, sueldo) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
        values: [
            params.id_cuadro,
            params.cargo,
            params.formacion,
            params.expgen_anio,
            params.expgen_mes,
            params.expesp_anio,
            params.expesp_mes,
            params.cursos,
            params.apiestado,
            params.usucre,
            params.feccre,
            params.titulo_expgeneral,
            params.titulo_expespecifica,
            params.nivel_salarial,
            params.sueldo
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

const postNotaAdjudicacion = async (req, res) => {
    var params = req.body;
    const query = {
        text: `INSERT INTO contrataciones.nota_adjudicacion
        (id_formulario_contratacion, usuario, documentos_presentar, hr, cite, created_at, cil) 
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        values: [
            params.id_formulario_contratacion,
            params.usuario,
            params.documentos_presentar,
            params.hr,
            params.cite,
            params.created_at,
            params.cil
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

const findIdFucInNotaAd = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT id_formulario_contratacion
                                        FROM  contrataciones.nota_adjudicacion  
                                        WHERE id_formulario_contratacion=${id}
                                    `);
    res.status(200).json(response.rows);
};

const getNotaById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        a.id_certificacion_poa, a.fecha_solicitud, 
        a.accion_corto_plazo, a.resultado_esperado, i.login,
        d.objeto_contratacion,e.detalle, h.sigla,e.fuente_fin, e.organismo_fin,
        j.documentos_presentar, j.hr, j.cite, j.cil
        FROM contrataciones.certificacion_poa a, contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
        contrataciones.proyectos e, direcciones h, seg_usuario i, contrataciones.nota_adjudicacion j
        WHERE a.id_formulario_contratacion = b.id_formulario_contratacion
        AND b.id_termino_referencia = d.id_termino_referencia
        AND d.id_proyecto = e.id_proyecto
        AND d.id_usuarios = i.id_usuario
        AND i.id_direccion = h.id_direccion 
        AND j.id_formulario_contratacion = b.id_formulario_contratacion
	    AND j.id_nota_adjudicacion=${id}
    `);
    res.status(200).json(response.rows);
};

const getIdNotaByIdFuc = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT id_nota_adjudicacion 
                                      FROM contrataciones.nota_adjudicacion
                                      WHERE id_formulario_contratacion = ${id}`);
    res.status(200).json(response.rows);
};

const putNotaAdjudicacion = async (req, res) => {
    var id = req.params.id;
    var params = req.body;

    const query = {
        text: `UPDATE contrataciones.nota_adjudicacion 
                SET documentos_presentar=$1, hr=$2, cite=$3, cil=$4
                WHERE id_nota_adjudicacion=${id}`,
        values: [
            params.documentos_presentar,
            params.hr,
            params.cite,
            params.cil
        ],
    };
    await con
        .query(query)
        .then((result) =>
            res.status(200).json({
                datos: result,
            })
        ).catch((e) => console.error(e.stack));
};

module.exports = {
    getAllPoa,
    getReqFucviaPoaId,
    getMenu,
    getMenuAll,
    getCursoSeminario,
    getCursoSeminarioEsp,
    getExperiencia,
    getExperienciaEsp,
    getExperienciaGral,
    getFormacionAc,
    getIdiomas,
    getCuadroEq,
    getCuadroId,
    putCuadroEq,
    postCuadroEq,
    postNotaAdjudicacion,
    findIdFucInNotaAd,
    getNotaById,
    getIdNotaByIdFuc,
    putNotaAdjudicacion
};
