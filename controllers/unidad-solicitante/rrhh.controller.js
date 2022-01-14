const Fuc = require("../../models/fuc");
const con = require("../../server/config");


const putFuc = async (req, res) => {
	var id = req.params.id;
	var params = req.body;

	var fuc = new Fuc();
	fuc.forma_adjudicacion = params.forma_adjudicacion;
	fuc.id_postulantes = params.id_postulantes;
	fuc.metodo_seleccion_adjudicacion = params.metodo_seleccion_adjudicacion;
	fuc.pac = params.pac;

	const query = {
		text: `UPDATE contrataciones.formulario_contrataciones
		 SET forma_adjudicacion=$1, id_postulantes=$2, metodo_seleccion_adjudicacion=$3, pac=$4 WHERE id_formulario_contratacion=${id}`,
		values: [
			fuc.forma_adjudicacion,
			fuc.id_postulantes,
			fuc.metodo_seleccion_adjudicacion,
			fuc.pac
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

const getPostulanteDeFuc = async (req, res) => {
	var id = req.params.id;
	const response = await con.query(`SELECT a.id_persona, a.nombres, a.apellido_paterno, a.apellido_materno
											FROM seg_persona a, contrataciones.formulario_contrataciones b
											WHERE a.id_persona = b.id_postulantes
											AND b.id_formulario_contratacion = ${id}
                                        `);
	res.status(200).json(response.rows);
};

module.exports = {
	putFuc,
	getPostulanteDeFuc
};
