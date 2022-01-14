const Tdr = require("../../models/tdr");
const Fuc = require("../../models/fuc");
const con = require("../../server/config");

const getTdr = async (req, res) => {
	const response = await con.query(`				
			SELECT a.id_termino_referencia, b.cargo, b.nivel_salarial, b.sueldo, a.sede_trabajo,
			a.objeto_contratacion, a.modalidad_contratacion, a.fecha_inicio, a.meses_contrato, 
			a.dias_contrato, a.antecedentes, a.justificacion, a.objetivo_consultoria, a.area,
			a.resultados_esperados, a.funciones, a.actividades, a.perfil_formacion_min, 
			a.perfil_cursos_req, a.perfil_exp_gral, a.perfil_exp_esp, a.documentos_presentar,
			d.detalle, d.sigla, c.login, e.detalle as detalle_proyecto, e.sigla as sigla_proyecto
			FROM contrataciones.terminos_referencias a, postulaciones.pos_cuadro_eq b, 
			public.seg_usuario c, public.direcciones d, contrataciones.proyectos e
			WHERE a.id_cuadro_equivalencia = b.id_cuadro
			AND a.id_usuarios = c.id_usuario
			AND c.id_direccion = d.id_direccion
			AND a.id_proyecto = e.id_proyecto
			ORDER BY a.id_termino_referencia DESC
	`);

	res.status(200).json(response.rows);
};

const getPreTdr = async (req, res) => {
	const response = await con.query(`
		SELECT id_convocatoria, puesto_cargo, remuneracion, num_vacancia, fecha_publicacion, fecha_fin_conv, hora_fin_conv, sede_trabajo 
		FROM postulaciones.pos_convocatorias
		order by id_convocatoria desc
			
	`);
	res.status(200).json(response.rows);
};

const getPreTdrById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`
		SELECT * FROM postulaciones.pos_convocatorias
		WHERE id_convocatoria = ${id}
	`);
	res.status(200).json(response.rows);
};

const getTdrTableFuc = async (req, res) => {
	var ids = req.params.id;
	const response = await con.query(`SELECT b.id_termino_referencia 
										FROM contrataciones.terminos_referencias a, contrataciones.formulario_contrataciones b 
										WHERE  b.id_termino_referencia=${ids}
										AND  a.id_termino_referencia=b.id_termino_referencia`);
	res.status(200).json(response.rows);
};

const findIdConvInTdr = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`SELECT id_convocatoria 
									  FROM contrataciones.terminos_referencias 
									  WHERE id_convocatoria = ${id}`);
	res.status(200).json(response.rows);
};

const getCuadroEquivalencia = async (req, res) => {
	const response = await con.query("SELECT * FROM postulaciones.pos_cuadro_eq");
	res.status(200).json(response.rows);
};

const getProyecto = async (req, res) => {
	const response = await con.query("SELECT * FROM contrataciones.proyectos");
	res.status(200).json(response.rows);
};
const getProyectoById = async (req, res) => {
	var ids = req.params.id;
	const response = await con.query(`SELECT * FROM contrataciones.proyectos WHERE id_proyecto=${ids}`);
	res.status(200).json(response.rows);
};

const getDireccion = async (req, res) => {
	const response = await con.query("SELECT * FROM public.direcciones");
	res.status(200).json(response.rows);
};


const obtenerTdrPorId = async (req, res) => {
	var id = req.params.id;
	const response =
		await con.query(`
				SELECT b.cargo, b.nivel_salarial, b.sueldo, a.id_proyecto, a.objeto_contratacion, a.modalidad_contratacion, a.sueldo_total, a.honorarios_me,
				a.fecha_inicio, a.meses_contrato, a.dias_contrato, a.antecedentes, a.justificacion, a.id_convocatoria, a.objetivo_consultoria,a.resultados_esperados, 
				a.funciones, a.actividades, a.perfil_formacion_min, a.perfil_cursos_req, a.perfil_exp_gral, c.organismo_fin, a.area, a.lugar_horario, a.supervision_dep,
				a.perfil_exp_esp, a.documentos_presentar, c.sigla, d.gestion, f.detalle, b.id_cuadro, a.sede_trabajo, a.expgen_anio, a.expgen_mes, a.expesp_anio, a.expesp_mes
				FROM contrataciones.terminos_referencias a, postulaciones.pos_cuadro_eq b, contrataciones.proyectos c,
				contrataciones.gestiones d, public.seg_usuario e, public.direcciones f
				WHERE a.id_termino_referencia = ${id}
				AND a.id_usuarios = e.id_usuario
				AND e.id_direccion = f.id_direccion
				AND a.id_cuadro_equivalencia = b.id_cuadro
				AND a.id_proyecto = c.id_proyecto
				AND a.id_gestion = d.id_gestion
		`);
	res.status(200).json(response.rows);
};

const postTdr = async (req, res) => {
	console.log('req', req);

	var params = req.body;

	var tdr = new Tdr();
	tdr.id_cuadro_equivalencia = params.id_cuadro_equivalencia;
	tdr.id_proyecto = params.id_proyecto;
	tdr.id_gestion = params.id_gestion;
	tdr.sede_trabajo = params.sede_trabajo;
	tdr.objeto_contratacion = params.objeto_contratacion;
	tdr.modalidad_contratacion = params.modalidad_contratacion;
	tdr.fecha_inicio = params.fecha_inicio;
	tdr.meses_contrato = params.meses_contrato;
	tdr.dias_contrato = params.dias_contrato;
	tdr.sueldo_total = params.sueldo_total;
	tdr.antecedentes = params.antecedentes;
	tdr.justificacion = params.justificacion;
	tdr.objetivo_consultoria = params.objetivo_consultoria;
	tdr.resultados_esperados = params.resultados_esperados;
	tdr.funciones = params.funciones;
	tdr.actividades = params.actividades;
	tdr.perfil_formacion_min = params.perfil_formacion_min;
	tdr.perfil_cursos_req = params.perfil_cursos_req;
	tdr.perfil_exp_gral = params.perfil_exp_gral;
	tdr.perfil_exp_esp = params.perfil_exp_esp;
	tdr.documentos_presentar = params.documentos_presentar;
	tdr.usuario = params.usuario;
	tdr.id_usuarios = params.id_usuarios;
	tdr.id_tdr_principal = params.id_tdr_principal;
	tdr.expesp_anio = params.expesp_anio;
	tdr.expesp_mes = params.expesp_mes;
	tdr.expgen_mes = params.expgen_mes;
	tdr.expgen_anio = params.expgen_anio;
	tdr.id_convocatoria = params.id_convocatoria;
	tdr.area = params.area;
	tdr.lugar_horario = params.lugar_horario;
	tdr.supervision_dep = params.supervision_dep;
	tdr.honorarios_me = params.honorarios_me;

	const query = {
		text: `INSERT INTO contrataciones.terminos_referencias 
		(id_cuadro_equivalencia, id_proyecto, id_gestion, sede_trabajo, objeto_contratacion, modalidad_contratacion, fecha_inicio, meses_contrato, 
		dias_contrato, sueldo_total, antecedentes, justificacion, objetivo_consultoria, resultados_esperados, funciones, actividades, perfil_formacion_min, 
		perfil_cursos_req, perfil_exp_gral, perfil_exp_esp, documentos_presentar, usuario, id_usuarios, id_tdr_principal,
		expesp_anio, expesp_mes, expgen_mes, expgen_anio, id_convocatoria, area, lugar_horario, supervision_dep, honorarios_me) 
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33) RETURNING *`,
		//text: "select postulaciones.fn_evapost_terminos_referencia_adicion($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29)",
		values: [
			tdr.id_cuadro_equivalencia,
			tdr.id_proyecto,
			tdr.id_gestion,
			tdr.sede_trabajo,
			tdr.objeto_contratacion,
			tdr.modalidad_contratacion,
			tdr.fecha_inicio,
			tdr.meses_contrato,
			tdr.dias_contrato,
			tdr.sueldo_total,
			tdr.antecedentes,
			tdr.justificacion,
			tdr.objetivo_consultoria,
			tdr.resultados_esperados,
			tdr.funciones,
			tdr.actividades,
			tdr.perfil_formacion_min,
			tdr.perfil_cursos_req,
			tdr.perfil_exp_gral,
			tdr.perfil_exp_esp,
			tdr.documentos_presentar,
			tdr.usuario,
			tdr.id_usuarios,
			tdr.id_tdr_principal,
			tdr.expesp_anio,
			tdr.expesp_mes,
			tdr.expgen_mes,
			tdr.expgen_anio,
			tdr.id_convocatoria,
			tdr.area,
			tdr.lugar_horario,
			tdr.supervision_dep,
			tdr.honorarios_me
		],
	};
	console.log(query);
	await con
		.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};




const postTdrPre = async (req, res) => {
	var params = req.body;
	let array = [];
	console.log('params --->', params);
	console.log('cantidad --->', params.cantidad);

	let total = params.cantidad;

	for (let j in total) {
		let t = total[j].num
		console.log(total[j].num);

		for (let i = 0; i < t; i++) {
			array.push(`(${params.id_cuadro_equivalencia}, ${params.id_proyecto}, ${params.id_gestion}, '${total[j].dep}', 
			'${params.objeto_contratacion}', '${params.modalidad_contratacion}', '${params.fecha_inicio}', ${params.meses_contrato}, 
			${params.dias_contrato}, ${params.sueldo_total}, '${params.antecedentes}', '${params.justificacion}', '${params.objetivo_consultoria}', 
			'${params.funciones}', '${params.actividades}', '${params.perfil_formacion_min}', 
			'${params.perfil_cursos_req}', '${params.perfil_exp_gral}', '${params.perfil_exp_esp}', '${params.documentos_presentar}', 
			${params.usuario}, ${params.id_usuarios},${params.id_tdr_principal}, ${params.expesp_anio}, 
			${params.expesp_mes}, ${params.expgen_mes}, ${params.expgen_anio}, ${params.id_convocatoria}, 
			'${params.area}', '${params.lugar_horario}', '${params.supervision_dep}', '${params.honorarios_me}' )`);
		}
	}
	const valores = array.join();
	console.log('valores--->', valores);
	const query = {
		text: `INSERT INTO contrataciones.terminos_referencias (id_cuadro_equivalencia, id_proyecto, id_gestion, sede_trabajo, objeto_contratacion, modalidad_contratacion, 
			fecha_inicio, meses_contrato, dias_contrato, sueldo_total, antecedentes, justificacion, objetivo_consultoria, funciones, actividades, 
			perfil_formacion_min, perfil_cursos_req, perfil_exp_gral, perfil_exp_esp, documentos_presentar, usuario, id_usuarios, id_tdr_principal, expesp_anio, expesp_mes, 
			expgen_mes, expgen_anio, id_convocatoria, area, lugar_horario, supervision_dep, honorarios_me) VALUES ${valores} RETURNING * `,
	};
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));

};

const putTdr = async (req, res) => {
	var ids = req.params.id;
	var params = req.body;

	var tdr = new Tdr();
	tdr.id_cuadro = params.id_cuadro_equivalencia;
	tdr.id_proyecto = params.id_proyecto;
	tdr.id_gestion = params.id_gestion;
	tdr.objeto_contratacion = params.objeto_contratacion;
	tdr.modalidad_contratacion = params.modalidad_contratacion;
	tdr.fecha_inicio = params.fecha_inicio;
	tdr.meses_contrato = params.meses_contrato;
	tdr.dias_contrato = params.dias_contrato;
	tdr.antecedentes = params.antecedentes;
	tdr.justificacion = params.justificacion;
	tdr.objetivo_consultoria = params.objetivo_consultoria;
	tdr.resultados_esperados = params.resultados_esperados;
	tdr.funciones = params.funciones;
	tdr.actividades = params.actividades;
	tdr.perfil_formacion_min = params.perfil_formacion_min;
	tdr.perfil_cursos_req = params.perfil_cursos_req;
	tdr.perfil_exp_gral = params.perfil_exp_gral;
	tdr.perfil_exp_esp = params.perfil_exp_esp;
	tdr.documentos_presentar = params.documentos_presentar;
	tdr.usuario = params.usuario;
	tdr.updated_at = params.updated_at;
	tdr.sede_trabajo = params.sede_trabajo;
	tdr.expgen_anio = params.expgen_anio;
	tdr.expgen_mes = params.expgen_mes;
	tdr.expesp_anio = params.expesp_anio;
	tdr.expesp_mes = params.expesp_mes;
	tdr.sueldo_total = params.sueldo_total;

	const query = {
		text: `UPDATE contrataciones.terminos_referencias SET id_cuadro_equivalencia=$1, id_proyecto=$2, id_gestion=$3, objeto_contratacion=$4, modalidad_contratacion=$5, fecha_inicio=$6, meses_contrato=$7, dias_contrato=$8,
		 antecedentes=$9, justificacion=$10, objetivo_consultoria=$11, resultados_esperados=$12, funciones=$13, actividades=$14, perfil_formacion_min=$15, perfil_cursos_req=$16, perfil_exp_gral=$17, 
		 perfil_exp_esp=$18, documentos_presentar=$19, usuario=$20, updated_at=$21, sede_trabajo=$22, expgen_anio=$23, expgen_mes=$24, expesp_anio=$25, expesp_mes=$26, sueldo_total=$27 WHERE id_termino_referencia=${ids}`,
		values: [
			tdr.id_cuadro,
			tdr.id_proyecto,
			tdr.id_gestion,
			tdr.objeto_contratacion,
			tdr.modalidad_contratacion,
			tdr.fecha_inicio,
			tdr.meses_contrato,
			tdr.dias_contrato,
			tdr.antecedentes,
			tdr.justificacion,
			tdr.objetivo_consultoria,
			tdr.resultados_esperados,
			tdr.funciones,
			tdr.actividades,
			tdr.perfil_formacion_min,
			tdr.perfil_cursos_req,
			tdr.perfil_exp_gral,
			tdr.perfil_exp_esp,
			tdr.documentos_presentar,
			tdr.usuario,
			tdr.updated_at,
			tdr.sede_trabajo,
			tdr.expgen_anio,
			tdr.expgen_mes,
			tdr.expesp_anio,
			tdr.expesp_mes,
			tdr.sueldo_total
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


const putCorrelativo = async (req, res) => {
	var id = req.params.id;
	var params = req.body;
	const query = {
		text: `UPDATE public.seg_usuario SET correlativo=$1 WHERE id_usuario=${id} RETURNING *`,
		values: [
			params.correlativo
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

const putTdrPre = async (req, res) => {
	var ids = req.params.id;
	var params = req.body;

	var tdr = new Tdr();
	tdr.id_cuadro = params.id_cuadro_equivalencia;
	tdr.id_proyecto = params.id_proyecto;
	tdr.id_gestion = params.id_gestion;
	tdr.objeto_contratacion = params.objeto_contratacion;
	tdr.modalidad_contratacion = params.modalidad_contratacion;
	tdr.fecha_inicio = params.fecha_inicio;
	tdr.meses_contrato = params.meses_contrato;
	tdr.dias_contrato = params.dias_contrato;
	tdr.antecedentes = params.antecedentes;
	tdr.justificacion = params.justificacion;
	tdr.objetivo_consultoria = params.objetivo_consultoria;
	tdr.resultados_esperados = params.resultados_esperados;
	tdr.funciones = params.funciones;
	tdr.actividades = params.actividades;
	tdr.perfil_formacion_min = params.perfil_formacion_min;
	tdr.perfil_cursos_req = params.perfil_cursos_req;
	tdr.perfil_exp_gral = params.perfil_exp_gral;
	tdr.perfil_exp_esp = params.perfil_exp_esp;
	tdr.documentos_presentar = params.documentos_presentar;
	tdr.usuario = params.usuario;
	tdr.updated_at = params.updated_at;
	tdr.sede_trabajo = params.sede_trabajo;
	tdr.expgen_anio = params.expgen_anio;
	tdr.expgen_mes = params.expgen_mes;
	tdr.expesp_anio = params.expesp_anio;
	tdr.expesp_mes = params.expesp_mes;
	tdr.sueldo_total = params.sueldo_total;
	tdr.area = params.area;
	tdr.honorarios_me = params.honorarios_me;
	tdr.lugar_horario = params.lugar_horario;
	tdr.supervision_dep = params.supervision_dep;


	const query = {
		text: `UPDATE contrataciones.terminos_referencias SET id_cuadro_equivalencia=$1, id_proyecto=$2, id_gestion=$3, objeto_contratacion=$4, modalidad_contratacion=$5, fecha_inicio=$6, meses_contrato=$7, dias_contrato=$8,
		 antecedentes=$9, justificacion=$10, objetivo_consultoria=$11, resultados_esperados=$12, funciones=$13, actividades=$14, perfil_formacion_min=$15, perfil_cursos_req=$16, perfil_exp_gral=$17, 
		 perfil_exp_esp=$18, documentos_presentar=$19, usuario=$20, updated_at=$21, sede_trabajo=$22, expgen_anio=$23, expgen_mes=$24, expesp_anio=$25, expesp_mes=$26, sueldo_total=$27, 
		 area=$28, honorarios_me=$29, lugar_horario=$30, supervision_dep=$31 WHERE id_termino_referencia=${ids}`,
		values: [
			tdr.id_cuadro,
			tdr.id_proyecto,
			tdr.id_gestion,
			tdr.objeto_contratacion,
			tdr.modalidad_contratacion,
			tdr.fecha_inicio,
			tdr.meses_contrato,
			tdr.dias_contrato,
			tdr.antecedentes,
			tdr.justificacion,
			tdr.objetivo_consultoria,
			tdr.resultados_esperados,
			tdr.funciones,
			tdr.actividades,
			tdr.perfil_formacion_min,
			tdr.perfil_cursos_req,
			tdr.perfil_exp_gral,
			tdr.perfil_exp_esp,
			tdr.documentos_presentar,
			tdr.usuario,
			tdr.updated_at,
			tdr.sede_trabajo,
			tdr.expgen_anio,
			tdr.expgen_mes,
			tdr.expesp_anio,
			tdr.expesp_mes,
			tdr.sueldo_total,
			tdr.area,
			tdr.honorarios_me,
			tdr.lugar_horario,
			tdr.supervision_dep
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


/* Muestra del select el listado */
const getPostulantes = async (req, res) => {
	var id = req.params.id
	const response =
		/* await con.query(`SELECT id_persona, nombres, apellido_paterno, apellido_materno FROM public.postulantes_seleccionados 
		where id_termino_referencia=${id}`); */
		await con.query(`SELECT id_persona, nombres, apellido_paterno, apellido_materno FROM public.postulantes_seleccionados 
		`);
	res.status(200).json(response.rows);
}

const getPostulantesSeleccionados = async (req, res) => {
	var id = req.params.id;
	const response =
		await con.query(`select * from public.seg_persona where id_persona=${id}`);
	res.status(200).json(response.rows);
}

const postFuc = async (req, res) => {
	var params = req.body;

	var fuc = new Fuc();
	fuc.id_termino_referencia = params.id_termino_referencia;
	fuc.id_postulantes = params.id_postulantes;
	fuc.forma_adjudicacion = params.forma_adjudicacion;
	fuc.metodo_seleccion_adjudicacion = params.metodo_seleccion_adjudicacion;
	fuc.created_at = params.created_at;
	fuc.updated_at = params.updated_at;
	fuc.pac = params.pac;
	fuc.correlativo = params.correlativo;

	const query = {
		text: "INSERT INTO contrataciones.formulario_contrataciones (id_termino_referencia, id_postulantes, forma_adjudicacion, metodo_seleccion_adjudicacion, created_at, updated_at, pac, correlativo) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
		values: [
			fuc.id_termino_referencia,
			fuc.id_postulantes,
			fuc.forma_adjudicacion,
			fuc.metodo_seleccion_adjudicacion,
			fuc.created_at,
			fuc.updated_at,
			fuc.pac,
			fuc.correlativo
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


const obtenerFucPorId = async (req, res) => {
	var id = req.params.id;
	const response =
		await con.query(`
		SELECT c.id_termino_referencia, g.sigla as sigla_dir, a.id_formulario_contratacion, a.id_postulantes,
		a.forma_adjudicacion, a.pac, a.metodo_seleccion_adjudicacion, c.objeto_contratacion, c.sueldo_total,
		c.dias_contrato, c.meses_contrato, c.fecha_inicio, d.cargo, d.sueldo, e.detalle, e.sigla, a.correlativo
		FROM contrataciones.formulario_contrataciones a, contrataciones.terminos_referencias c, 
		postulaciones.pos_cuadro_eq d, contrataciones.proyectos e, seg_usuario f, direcciones g, contrataciones.gestiones h
		WHERE a.id_formulario_contratacion = ${id}
		AND a.id_termino_referencia = c.id_termino_referencia	
		AND c.id_gestion = h.id_gestion
		AND c.id_cuadro_equivalencia = d.id_cuadro	
		AND c.id_proyecto = e.id_proyecto
		AND c.id_usuarios = f.id_usuario
		AND f.id_direccion = g.id_direccion	
		`);
	res.status(200).json(response.rows);
};

module.exports = {
	getTdr,
	getPreTdr,
	getPreTdrById,
	getCuadroEquivalencia,
	postTdr,
	postTdrPre,
	obtenerTdrPorId,
	putTdr,
	getPostulantes,
	postFuc,
	obtenerFucPorId,
	getProyecto,
	getTdrTableFuc,
	getDireccion,
	getProyectoById,
	getPostulantesSeleccionados,
	findIdConvInTdr,
	putTdrPre,
	putCorrelativo
};
