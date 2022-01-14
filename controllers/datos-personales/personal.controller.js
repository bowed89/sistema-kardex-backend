const con = require("../../server/config");

const getPersonal = async (req, res) => {
	const response = await con.query(`				
			SELECT * FROM public.sdp_personal 
	`);

	res.status(200).json(response.rows);
};

const getPersonalById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`				
			SELECT * FROM public.sdp_personal WHERE id_personal = ${id}
	`);

	res.status(200).json(response.rows);
};

const getDependientesById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`				
			SELECT * FROM public.sdp_dependientes WHERE id_personal = ${id}
	`);

	res.status(200).json(response.rows);
};

const getConyugueById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`				
			SELECT * FROM public.sdp_conyugue WHERE id_personal = ${id}
	`);

	res.status(200).json(response.rows);
};

const getEducacionById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`				
			SELECT * FROM public.sdp_formacion_academica WHERE id_personal = ${id}
	`);

	res.status(200).json(response.rows);
};

const getExperienciaLaboralById = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`				
			SELECT * FROM public.sdp_experiencia_laboral WHERE id_personal = ${id}
	`);
	res.status(200).json(response.rows);
};


const postPersonal = async (req, res) => {
	var params = req.body;

	const query = {
		text: `INSERT INTO public.sdp_personal 
		(nombres, ap_paterno, ap_materno, ci, celular, telefono, extension, fecha_nacimiento, edad, 
		estado_civil, nacionalidad, lugar_nacimiento, zona, ciudad, email, domicilio, profesion, tipo_sangre, 
		medicamento_alergia, barrio, edificio, piso, edificio_dpto, casilla, direccion_puesto, denominacion_puesto,
		fecha_ingreso_cargo, cargo_jefe_inmediato, ultima_fecha_ingreso_ine, calif_anios_servicio, created_at) 
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,now()) RETURNING *`,
		values: [
			params.nombres,
			params.ap_paterno,
			params.ap_materno,
			params.ci,
			params.celular,
			params.telefono,
			params.extension,
			params.fecha_nacimiento,
			params.edad,
			params.estado_civil,
			params.nacionalidad,
			params.lugar_nacimiento,
			params.zona,
			params.ciudad,
			params.email,
			params.domicilio,
			params.profesion,
			params.tipo_sangre,
			params.medicamento_alergia,
			params.barrio,
			params.edificio,
			params.piso,
			params.edificio_dpto,
			params.casilla,
			params.direccion_puesto,
			params.denominacion_puesto,
			params.fecha_ingreso_cargo,
			params.cargo_jefe_inmediato,
			params.ultima_fecha_ingreso_ine,
			params.calif_anios_servicio
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

const putPersonal = async (req, res) => {
	var params = req.body;
	var id = req.params.id;
	const query = {
		text: `
			UPDATE public.sdp_personal SET 
			nombres=$1, ap_paterno=$2, ap_materno=$3, ci=$4, celular=$5, telefono=$6, extension=$7, 
			fecha_nacimiento=$8, estado_civil=$9, lugar_nacimiento=$10, zona=$11, email=$12, 
			domicilio=$13, profesion=$14, barrio=$15, updated_at=$16, nro_domicilio=$17, sexo=$18, telefono_emergencia=$19, 
			tipo_sangre=$20, med_alergias=$21, edificio=$22, piso=$23, dpto=$24, casilla=$25, direccion_puesto=$26, denominacion_puesto=$27,
			fecha_ingreso_cargo=$28, cargo_jefe_inmediato=$29, ultima_fecha_ingreso_ine=$30, calif_anios_servicio=$31
			WHERE id_personal=${id} RETURNING *`,
		values: [
			params.nombres,
			params.ap_paterno,	
			params.ap_materno,
			params.ci,
			params.celular,
			params.telefono,
			params.extension,
			params.fecha_nacimiento,
			params.estado_civil,
			params.lugar_nacimiento,
			params.zona,
			params.email,
			params.domicilio,
			params.profesion,
			params.barrio,
			params.updated_at,
			params.nro_domicilio,
			params.sexo,
			params.telefono_emergencia,
			params.tipo_sangre,
			params.med_alergias,
			params.edificio,
			params.piso,
			params.dpto,
			params.casilla,
			params.direccion_puesto,
			params.denominacion_puesto,
			params.fecha_ingreso_cargo,
			params.cargo_jefe_inmediato,
			params.ultima_fecha_ingreso_ine,
			params.calif_anios_servicio
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

const putConyugue = async (req, res) => {
	var params = req.body;
	var id = req.params.id;
	console.log(params);
	console.log(id);

	const query = {
		text: `
			UPDATE public.sdp_conyugue SET 
			id_personal=$1, nombres=$2, ap_paterno=$3, ap_materno=$4, telefono=$5, ocupacion=$6,
			lugar_nacimiento=$7, fecha_nacimiento=$8, cedula_identidad=$9, ciudad=$10
			WHERE id_personal=${id} RETURNING *`,
		values: [
			params.id_personal,
			params.nombres,
			params.ap_paterno,
			params.ap_materno,
			params.telefono,
			params.ocupacion,
			params.lugar_nacimiento,
			params.fecha_nacimiento,
			params.cedula_identidad,
			params.ciudad
		],
	};
	console.log("queryyy");
	await con
		.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0]
			})
		).catch((e) => console.error(e.stack));
};

const postConyugue = async (req, res) => {
	var params = req.body;
	const query = {
		text: `INSERT INTO public.sdp_conyugue
		(id_personal, nombres, ap_paterno, ap_materno, telefono, ocupacion, lugar_nacimiento, fecha_nacimiento, 
			cedula_identidad, ciudad, created_at) 
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now()) RETURNING *`,
		values: [
			params.id_personal,
			params.nombres,
			params.ap_paterno,
			params.ap_materno,
			params.telefono,
			params.ocupacion,
			params.lugar_nacimiento,
			params.fecha_nacimiento,
			params.cedula_identidad,
			params.ciudad
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

const postEducacion = async (req, res) => {
	var datos = req.body;
	console.log(req.body);
	let array = [];

	for (let i in datos) {
		array.push(`(${datos[i].id_personal},'${datos[i].titulo}', '${datos[i].nombre_carrera}', '${datos[i].nombre_instituto}', '${datos[i].fecha_titulacion}', '${datos[i].lugar_titulacion}', now() )`)
	}
	const valores = array.join();
	console.log('valores==> ', valores);

	const query = {
		text: `INSERT INTO public.sdp_formacion_academica (id_personal, titulo, nombre_carrera, nombre_instituto, fecha_titulacion, lugar_titulacion, created_at) VALUES ${valores} RETURNING * `,
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};

const postExperiencia = async (req, res) => {
	var datos = req.body;
	console.log(req.body);
	let array = [];

	for (let i in datos) {
		array.push(`(${datos[i].id_personal},'${datos[i].institucion}', '${datos[i].area}', '${datos[i].nombre_puesto}', '${datos[i].fecha_inicio}', '${datos[i].fecha_conclusion}', '${datos[i].tipo_funcionario}', '${datos[i].tiempo_trabajo}', '${datos[i].tipo_exp_laboral}', now() )`)
	}
	const valores = array.join();
	console.log('valores==> ', valores);

	const query = {
		text: `INSERT INTO public.sdp_experiencia_laboral (id_personal, institucion, area, nombre_puesto, fecha_inicio, fecha_conclusion, tipo_funcionario, tiempo_trabajo, tipo_exp_laboral, created_at) VALUES ${valores} RETURNING * `,
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};

const postDependiente = async (req, res) => {
	var datos = req.body;
	console.log(req.body);
	let array = [];

	for (let i in datos) {
		array.push(`(${datos[i].id_personal},'${datos[i].nombres}', '${datos[i].parentesco}', '${datos[i].discapacidad}', now() )`)
	}
	const valores = array.join();
	console.log('valores==> ', valores);

	const query = {
		text: `INSERT INTO public.sdp_dependientes (id_personal, nombres, parentesco, discapacidad, created_at) VALUES ${valores} RETURNING * `,
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};

const putDependiente = async (req, res) => {
	var datos = req.body;
	console.log('datos=>', datos);
	console.log('datos.id_dependientes', datos.id_dependientes);
	const query = {
		text: `
				UPDATE public.sdp_dependientes SET 
				id_personal=$1, nombres=$2, parentesco=$3, discapacidad=$4
				WHERE id_dependientes=${datos.id_dependientes} RETURNING *`,
		values: [
			datos.id_personal,
			datos.nombres,
			datos.parentesco,
			datos.discapacidad
		],
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));

};

const putEducacion = async (req, res) => {
	var datos = req.body;
	console.log('datos=>', datos);
	console.log('datos.id_dependientes', datos.id_formacion);
	const query = {
		text: `
				UPDATE public.sdp_formacion_academica SET 
				id_personal=$1, titulo=$2, nombre_carrera=$3, nombre_instituto=$4, fecha_titulacion=$5, lugar_titulacion=$6 
				WHERE id_formacion=${datos.id_formacion} RETURNING *`,
		values: [
			datos.id_personal,
			datos.titulo,
			datos.nombre_carrera,
			datos.nombre_instituto,
			datos.fecha_titulacion,
			datos.lugar_titulacion
		],
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));

};

const putExperienciaLaboral = async (req, res) => {
	var datos = req.body;
	console.log('datos=>', datos);
	console.log('datos.id_experiencia_laboral', datos.id_experiencia_laboral);
	const query = {
		text: `
				UPDATE public.sdp_experiencia_laboral SET 
				id_personal=$1, institucion=$2, area=$3, nombre_puesto=$4, fecha_inicio=$5, fecha_conclusion=$6, tipo_funcionario=$7, tiempo_trabajo=$8, tipo_exp_laboral=$9 
				WHERE id_experiencia_laboral=${datos.id_experiencia_laboral} RETURNING *`,
		values: [
			datos.id_personal,
			datos.institucion,
			datos.area,
			datos.nombre_puesto,
			datos.fecha_inicio,
			datos.fecha_conclusion,
			datos.tipo_funcionario,
			datos.tiempo_trabajo,
			datos.tipo_exp_laboral
		],
	};
	console.log('query', query);
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));

};

const deleteEducacion = async (req, res) => {
	var id = req.body.id_formacion;
	const query = {
		text: `DELETE FROM public.sdp_formacion_academica WHERE id_formacion = ${id}`
	}
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));

};

const deleteDependiente = async (req, res) => {
	var id = req.body.id_dependientes;
	const query = {
		text: `DELETE FROM public.sdp_dependientes WHERE id_dependientes = ${id}`
	}
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};

const postDocumentos = async (req, res) => {
	var params = req.body;

	const query = {
		text: `INSERT INTO public.sdp_documentos 
		(id_personal, nombre_documento, nombre_archivo, fecha_registro, created_at) 
		VALUES($1,$2,$3,$4,now()) RETURNING *`,
		values: [
			params.id_personal,
			params.nombre_documento,
			params.nombre_archivo,
			params.fecha_registro
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

const deleteDocumento = async (req, res) => {
	const query = {
		text: `DELETE FROM public.sdp_documentos WHERE nombre_documento = '${req.body.nombre}' AND id_personal = '${req.body.id_personal}' `
	}
	await con.query(query)
		.then((result) =>
			res.status(200).json({
				datos: result.rows[0],
			})
		)
		.catch((e) => console.error(e.stack));
};

const getDocumentoByName = async (req, res) => {
	console.log('asasasas', req.body.nombre);
	const response = await con.query(` SELECT * FROM public.sdp_documentos WHERE nombre_documento='${req.body.nombre}' `);
	res.status(200).json(response.rows);
};

const getDocumentoByIdPersonal = async (req, res) => {
	console.log('vcvcvcvcvcvc', req.body);
	const response = await con.query(` SELECT * FROM public.sdp_documentos WHERE id_personal='${req.body.id}' AND nombre_documento='${req.body.nombre}' `);
	res.status(200).json(response.rows);
};

module.exports = {
	getPersonal,
	getPersonalById,
	getConyugueById,
	getEducacionById,
	postPersonal,
	putPersonal,
	putConyugue,
	postConyugue,
	getDependientesById,
	postDependiente,
	postEducacion,
	postExperiencia,
	putDependiente,
	putEducacion,
	deleteEducacion,
	deleteDependiente,
	getExperienciaLaboralById,
	putExperienciaLaboral,
	postDocumentos,
	getDocumentoByName,
	getDocumentoByIdPersonal,
	deleteDocumento,


};
