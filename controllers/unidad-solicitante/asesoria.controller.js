const con = require("../../server/config");

const getAllNotaAdj = async (req, res) => {
    const response = await con.query(`	
        SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT numero_documento FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT id_persona FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        d.id_termino_referencia, b.id_formulario_contratacion, i.login, j.gestion, d.objeto_contratacion,e.detalle,
        h.sigla,e.fuente_fin, e.organismo_fin, k.cargo, l.hr, l.id_nota_adjudicacion
        FROM contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
        contrataciones.proyectos e, direcciones h, seg_usuario i, contrataciones.gestiones j, postulaciones.pos_cuadro_eq k, 
        contrataciones.nota_adjudicacion l
        WHERE b.id_termino_referencia = d.id_termino_referencia
        AND d.id_cuadro_equivalencia = k.id_cuadro
        AND d.id_proyecto = e.id_proyecto
        AND j.id_gestion = d.id_gestion
        AND d.id_usuarios = i.id_usuario
        AND i.id_direccion = h.id_direccion 
        AND l.id_formulario_contratacion = b.id_formulario_contratacion
    `);
    res.status(200).json(response.rows);
};

const getNotaById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT numero_documento FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT extension_documento FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT ciudad FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        j.gestion, d.objeto_contratacion,e.detalle, h.sigla, h.detalle, e.fuente_fin, e.organismo_fin, k.cargo, l.hr,
        d.objetivo_consultoria, l.cite, d.fecha_inicio, d.meses_contrato, d.dias_contrato, k.sueldo, m.qr
        FROM contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
        contrataciones.proyectos e, direcciones h, seg_usuario i, contrataciones.gestiones j, postulaciones.pos_cuadro_eq k, 
        contrataciones.nota_adjudicacion l, contrataciones.contrato m
        WHERE b.id_termino_referencia = d.id_termino_referencia
        AND d.id_cuadro_equivalencia = k.id_cuadro
        AND d.id_proyecto = e.id_proyecto
        AND j.id_gestion = d.id_gestion
        AND d.id_usuarios = i.id_usuario
        AND i.id_direccion = h.id_direccion 
        AND m.id_formulario_contratacion = b.id_formulario_contratacion
        AND l.id_formulario_contratacion = b.id_formulario_contratacion
        AND l.id_formulario_contratacion = ${id}
    `);
    res.status(200).json(response.rows);
};

const getNotaByQr = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT numero_documento FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT extension_documento FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT ciudad FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        j.gestion, d.objeto_contratacion,e.detalle, h.sigla, h.detalle, e.fuente_fin, e.organismo_fin, k.cargo, l.hr,
        d.objetivo_consultoria, l.cite, d.fecha_inicio, d.meses_contrato, d.dias_contrato, k.sueldo, m.qr
        FROM contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
        contrataciones.proyectos e, direcciones h, seg_usuario i, contrataciones.gestiones j, postulaciones.pos_cuadro_eq k, 
        contrataciones.nota_adjudicacion l, contrataciones.contrato m
        WHERE b.id_termino_referencia = d.id_termino_referencia
        AND d.id_cuadro_equivalencia = k.id_cuadro
        AND d.id_proyecto = e.id_proyecto
        AND j.id_gestion = d.id_gestion
        AND d.id_usuarios = i.id_usuario
        AND i.id_direccion = h.id_direccion 
        AND m.id_formulario_contratacion = b.id_formulario_contratacion
        AND l.id_formulario_contratacion = b.id_formulario_contratacion
        AND m.qr = ${id}
    `);
    res.status(200).json(response.rows);
};


const postNotaAdjudicacion = async (req, res) => {
    var params = req.body;
    const query = {
        text: `INSERT INTO contrataciones.nota_adjudicacion
        (id_certificacion_poa, usuario, documentos_presentar, hr, created_at) 
        VALUES($1,$2,$3,$4,$5) RETURNING *`,
        values: [
            params.id_certificacion_poa,
            params.usuario,
            params.documentos_presentar,
            params.hr,
            params.created_at
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

const postContrato = async (req, res) => {
    var params = req.body;
    const query = {
        text: `INSERT INTO contrataciones.contrato
        (id_formulario_contratacion, qr, usuario, created_at) 
        VALUES($1,$2,$3,$4) RETURNING *`,
        values: [
            params.id_formulario_contratacion,
            params.qr,
            params.usuario,
            params.created_at
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

const findIdPoaInNotaAd = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT id_certificacion_poa 
                                        FROM  contrataciones.nota_adjudicacion  
                                        WHERE  id_certificacion_poa=${id}
                                    `);
    res.status(200).json(response.rows);
};
const findIdFucInContrato = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`	select *  from contrataciones.contrato where id_formulario_contratacion=${id}`);
    res.status(200).json(response.rows);
};

const postInformeLegal = async (req, res) => {
    var params = req.body;
    const query = {
        text: `INSERT INTO contrataciones.informe_legal
        (id_formulario_contratacion, ci, nota_aceptacion, sippase, sin, nua, rupe, observaciones, recomendaciones, usuario, created_at) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        values: [
            params.id_formulario_contratacion,
            params.ci,
            params.nota_aceptacion,
            params.sippase,
            params.sin,
            params.nua,
            params.rupe,
            params.observaciones,
            params.recomendaciones,
            params.usuario,
            params.created_at
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

const findIdFucInInforme = async (req, res) => {
    var ids = req.params.id;
    const response = await con.query(`SELECT id_formulario_contratacion FROM contrataciones.informe_legal WHERE id_formulario_contratacion=${ids}`);
    res.status(200).json(response.rows);
};
const getFucTableInforme = async (req, res) => {
    var ids = req.params.id;
    const response = await con.query(`SELECT b.id_formulario_contratacion, b.id_informe
										FROM contrataciones.formulario_contrataciones a, contrataciones.informe_legal b 
										WHERE a.id_formulario_contratacion = b.id_formulario_contratacion
										AND b.id_formulario_contratacion=${ids}`);
    res.status(200).json(response.rows);
};

const getInformeById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT * from contrataciones.informe_legal where id_informe=${id}`);
    res.status(200).json(response.rows);
};

const getInformeId = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=b.id_postulantes), 
        (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=b.id_postulantes),
        d.modalidad_contratacion,d.fecha_inicio, d.objeto_contratacion, e.cargo, f.detalle, f.sigla,
        a.ci, a.nota_aceptacion, a.sippase, a.sin, a.nua, a.rupe, a.observaciones, a.recomendaciones
        from contrataciones.informe_legal a, contrataciones.formulario_contrataciones b,
        contrataciones.terminos_referencias d, postulaciones.pos_cuadro_eq e, contrataciones.proyectos f
        where a.id_formulario_contratacion = b.id_formulario_contratacion
        and b.id_termino_referencia = d.id_termino_referencia
        and d.id_cuadro_equivalencia = e.id_cuadro
        and f.id_proyecto = d.id_proyecto
        and  a.id_informe = ${id}
    `);
    res.status(200).json(response.rows);
};

const putInformeLegal = async (req, res) => {
    var id = req.params.id;
    var params = req.body;
    const query = {
        text: `UPDATE contrataciones.informe_legal 
        SET ci=$1, nota_aceptacion=$2, sippase=$3, sin=$4, nua=$5, rupe=$6, observaciones=$7, recomendaciones=$8 
        WHERE id_informe=${id}`,
        values: [
            params.ci,
            params.nota_aceptacion,
            params.sippase,
            params.sin,
            params.nua,
            params.rupe,
            params.observaciones,
            params.recomendaciones
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
    getAllNotaAdj,
    getNotaById,
    postNotaAdjudicacion,
    findIdPoaInNotaAd,
    postContrato,
    findIdFucInContrato,
    postInformeLegal,
    findIdFucInInforme,
    getFucTableInforme,
    getInformeById,
    getInformeId,
    getNotaByQr,
    putInformeLegal
};
