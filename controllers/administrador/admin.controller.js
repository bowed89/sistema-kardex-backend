const con = require("../../server/config");

const getAllPersonal = async (req, res) => {
	/* 	const response = await con.query(`				
				SELECT * FROM public.sdp_usuario`); */
	const response = await con.query(`				
			SELECT a.id_usuario, a.id_grupo, a.id_personal, a.login, b.descripcion
				FROM sdp_usuario a, sdp_grupo b
				WHERE a.id_grupo = b.id_grupo`);

	res.status(200).json(response.rows);
};

const getUsuarioById = async (req, res) => {
	var id = req.params.id;
	// const response = await con.query(`SELECT * FROM public.sdp_usuario WHERE id_usuario=${id}`);
	const response = await con.query(`
	SELECT a.id_usuario, a.id_grupo, a.id_personal, b.descripcion
				FROM sdp_usuario a, sdp_grupo b
				WHERE a.id_grupo = b.id_grupo
				AND a.id_usuario = ${id}
	`);
	res.status(200).json(response.rows);
};

const updateGrupo = async (req, res) => {
	var id = req.body.id;
	var params = req.body;

	const query = {
		text: `UPDATE public.sdp_usuario 
                SET id_grupo=$1 WHERE id_usuario=${id}`,
		values: [params.id_grupo],
	};
	await con.query(query).then((result) =>
		res.status(200).json({
			datos: result,
		})
	).catch((e) => console.error(e.stack));
}

module.exports = {
	getAllPersonal,
	getUsuarioById,
	updateGrupo
};
