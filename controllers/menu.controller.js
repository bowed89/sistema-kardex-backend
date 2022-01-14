const con = require("../server/config");

const getMenu = async (req, res) => {
    const response = await con.query(`	
            SELECT * FROM public.sdp_menu
            ORDER BY nombre='LISTADO DE PERSONAL', nombre='PERMISOS',
            nombre='EXPERIENCIA DE TRABAJO', nombre='ESTUDIOS REALIZADOS', nombre='VACACIONES',
            nombre='CONTRATOS E INFORMES', nombre='ACCIONES DE PERSONAL', nombre='DATOS PERSONALES'
        `);
    res.status(200).json(response.rows);
}

const getMenuById = async (req, res) => {
    const response = await con.query(`	
        SELECT * FROM public.sdp_menu WHERE grupo=${req.body.id} `);
    res.status(200).json(response.rows);
}

module.exports = {
    getMenu,
    getMenuById
};
