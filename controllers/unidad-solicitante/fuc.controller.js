const Fuc = require("../../models/fuc");
const con = require("../../server/config");

const getFuc = async (req, res) => {
    const response = await con.query(`
                SELECT (SELECT nombres FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
                (SELECT apellido_paterno FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
                (SELECT apellido_materno FROM public.seg_persona  WHERE id_persona=a.id_postulantes),
                (SELECT id_usuario FROM public.seg_usuario  WHERE id_persona=a.id_postulantes),
                a.id_formulario_contratacion, a.forma_adjudicacion, a.metodo_seleccion_adjudicacion, c.objeto_contratacion, f.sigla,
                c.dias_contrato, c.meses_contrato, c.id_termino_referencia, c.fecha_inicio, d.cargo, d.sueldo, e.login, a.id_postulantes
                FROM contrataciones.formulario_contrataciones a, contrataciones.terminos_referencias c, 
                postulaciones.pos_cuadro_eq d, seg_usuario e, direcciones f
                WHERE a.id_termino_referencia = c.id_termino_referencia	
                AND c.id_cuadro_equivalencia = d.id_cuadro
                AND c.id_usuarios = e.id_usuario
                AND e.id_direccion = f.id_direccion
    `);
    res.status(200).json(response.rows);
};
const getFucRrhh = async (req, res) => {
    const response = await con.query(`
                SELECT a.id_formulario_contratacion, a.forma_adjudicacion, a.metodo_seleccion_adjudicacion, a.form_req_obligatorio, a.form_req_otros, a.exp_req_gral,
                    a.exp_req_esp, a.inciso_g_art43, b.nombres, b.apellido_paterno, b.apellido_materno, b.numero_documento, c.objeto_contratacion,
                    c.dias_contrato, c.meses_contrato, c.fecha_inicio, d.cargo, d.sueldo
                    FROM contrataciones.formulario_contrataciones a, public.seg_persona b, contrataciones.terminos_referencias c, postulaciones.pos_cuadro_eq d
                    WHERE a.id_persona_postulante = b.id_persona	
                    AND a.forma_adjudicacion = 0
                    AND a.metodo_seleccion_adjudicacion = 0
                    AND a.form_req_obligatorio = 0
                    AND a.form_req_otros = 0
                    AND a.exp_req_gral = 0
                    AND a.exp_req_esp = 0
                    AND a.inciso_g_art43 = 0
                    AND a.id_termino_referencia = c.id_termino_referencia	
                    AND c.id_cuadro_equivalencia = d.id_cuadro`);
    res.status(200).json(response.rows);
};

const getDireccionDuser = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT b.detalle
                                        FROM  seg_usuario a, direcciones b
                                        WHERE a.id_direccion = b.id_direccion
                                        AND a.id_usuario = ${id}
                                        `);
    res.status(200).json(response.rows);
};

const getPoaById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
                                    SELECT a.id_certificacion_poa, a.created_at, a.fecha_solicitud, a.accion_corto_plazo, a.resultado_esperado, b.id_formulario_contratacion,
                                    h.detalle as detalleDir, h.sigla as siglaDir,a.operacion, a.tdr, a.fuc, a.hoja_vida, d.objeto_contratacion,
                                    e.detalle, e.sigla, e.fuente_fin, e.organismo_fin, f.gestion, d.objeto_contratacion, i.cargo
                                    FROM contrataciones.certificacion_poa a, contrataciones.formulario_contrataciones b, contrataciones.terminos_referencias d,
                                    contrataciones.proyectos e, contrataciones.gestiones f, public.seg_usuario g, direcciones h, postulaciones.pos_cuadro_eq i
                                    WHERE a.id_formulario_contratacion = b.id_formulario_contratacion
                                    AND d.id_gestion = f.id_gestion
                                    AND b.id_termino_referencia = d.id_termino_referencia
                                    AND d.id_proyecto = e.id_proyecto
                                    AND d.id_usuarios = g.id_usuario
                                    AND g.id_direccion = h.id_direccion
                                    AND d.id_cuadro_equivalencia = i.id_cuadro
                                    AND a.id_certificacion_poa = ${id}
    `);
    res.status(200).json(response.rows);
};

const postFuc = async (req, res) => {
    var params = req.body;
    if (
        !params.id_formulario_contratacion ||
        !params.fecha_solicitud ||
        !params.accion_corto_plazo ||
        !params.resultado_esperado ||
        !params.operacion
    ) {
        return res.status(400).json({
            msg: "Por favor introduzca los campos requeridos",
            params,
        });
    } else {
        const query = {
            text: "INSERT INTO contrataciones.certificacion_poa (id_formulario_contratacion, fecha_solicitud, accion_corto_plazo, resultado_esperado, operacion, tdr, fuc, hoja_vida, created_at, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7, $8, $9, $10) RETURNING *",
            values: [
                params.id_formulario_contratacion,
                params.fecha_solicitud,
                params.accion_corto_plazo,
                params.resultado_esperado,
                params.operacion,
                params.tdr,
                params.fuc,
                params.hoja_vida,
                params.created_at,
                params.updated_at,
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
};

const getFucTablePoa = async (req, res) => {
    var ids = req.params.id;
    const response = await con.query(`SELECT b.id_formulario_contratacion, b.id_certificacion_poa
										FROM contrataciones.formulario_contrataciones a, contrataciones.certificacion_poa b 
										WHERE a.id_formulario_contratacion = b.id_formulario_contratacion
										AND b.id_formulario_contratacion=${ids}`);
    res.status(200).json(response.rows);
};

const getFucByIdTdr = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`SELECT b.id_formulario_contratacion
                                        FROM contrataciones.terminos_referencias a, contrataciones.formulario_contrataciones b 
                                        WHERE a.id_termino_referencia = b.id_termino_referencia
                                        AND b.id_termino_referencia=${id}`);
    res.status(200).json(response.rows);
};

const getDatasForFucById = async (req, res) => {
    var id = req.params.id;
    const response = await con.query(`
        SELECT g.detalle as detalle_dir, g.sigla as sigla_dir, c.objeto_contratacion, c.meses_contrato, c.dias_contrato, d.cargo, 
        d.sueldo, e.detalle, e.organismo_fin, e.sigla, i.gestion, c.modalidad_contratacion, a.metodo_seleccion_adjudicacion, 
        a.forma_adjudicacion, c.sueldo_total, a.id_postulantes, a.pac, a.correlativo
        FROM contrataciones.formulario_contrataciones a, 
        contrataciones.terminos_referencias c, postulaciones.pos_cuadro_eq d, contrataciones.proyectos e,
        seg_usuario f, direcciones g, seg_grupo h, contrataciones.gestiones i
        WHERE a.id_termino_referencia = c.id_termino_referencia
        AND c.id_cuadro_equivalencia = d.id_cuadro
        AND c.id_proyecto = e.id_proyecto
        AND c.id_usuarios = f.id_usuario
        AND f.id_grupo = h.id_grupo
        AND f.id_direccion = g.id_direccion
        AND c.id_gestion = i.id_gestion
        AND a.id_formulario_contratacion = ${id}
    `
    );
    res.status(200).json(response.rows);
};

const putPoa = async (req, res) => {
    var ids = req.params.id;
    var params = req.body;

    const query = {
        text: `UPDATE contrataciones.certificacion_poa SET fecha_solicitud=$1, accion_corto_plazo=$2, resultado_esperado=$3, 
        operacion=$4, tdr=$5, fuc=$6, hoja_vida=$7, updated_at=$8 WHERE id_certificacion_poa=${ids}`,
        values: [
            params.fecha_solicitud,
            params.accion_corto_plazo,
            params.resultado_esperado,
            params.operacion,
            params.tdr,
            params.fuc,
            params.hoja_vida,
            params.updated_at
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
    getFuc,
    postFuc,
    getPoaById,
    getDireccionDuser,
    getFucTablePoa,
    getFucRrhh,
    getFucByIdTdr,
    getDatasForFucById,
    putPoa
};
