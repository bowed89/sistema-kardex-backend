const { check } = require('express-validator');
const { ValidateFields } = require('../middlewares/field-validation');
const { Router } = require('express');

const {
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
    pdfContrato,
    pdfSupervisorEH2021,
    pdfAuxEH2021
} = require('../controllers/unidad-solicitante/usuario.controller');


const router = Router();


//pdf's
router.post('/pdf', pdf);
router.post('/pdfEH2021', pdfEH2021); //pdf TR
router.post('/pdfContrato', pdfContrato); // pdf TR ENCUESTA EH2021
router.post('/pdfSupervisorEH2021', pdfSupervisorEH2021); // pdf TR SUPERVISOR DE CAMPO EH2021
router.post('/pdfAuxEH2021', pdfAuxEH2021); // pdf TR SUPERVISOR DE CAMPO EH2021

router.get('/getUserById/:id', getUserById);
router.get('/getGrupo', getGrupo);
router.get('/getListado', getListado);
router.post('/getNumeroDocumento', getNumeroDocumento);
//nuevo post
//router.post('/postPersonUser', postPersonUser); 
router.post('/postPersonUser',
    [
        check('nombres', 'Introduzca el campo "Nombre de Usuario" ').not().isEmpty(),
        check('apellido_paterno', 'Introduzca el campo "Apellido Paterno" ').not().isEmpty(),
        check('apellido_materno', 'Introduzca el campo "Apellido Materno" ').not().isEmpty(),
        check('tipo_documento', 'Seleccione el Tipo de Documento').not().isEmpty(),
        check('numero_documento', 'Introduzca el campo "Número de Identidad" ').not().isEmpty(),
        check('correo', 'Introduzca el campo "Correo Electrónico" ').not().isEmpty().isEmail().withMessage('Correo Electrónico inválido'),
        check('login', 'Introduzca el campo "Nombre de Usuario" ').not().isEmpty(),
        check('password', 'Introduzca el campo "Nombre de Contraseña" ').not().isEmpty(),
        check('id_grupo', 'Seleccione el Grupo').not().isEmpty(),
        check('id_direccion', 'Seleccione la Dirección').not().isEmpty(),
        check('dep_trabajo', 'Seleccione la Sede de Trabajo').not().isEmpty(),
        ValidateFields
    ], postPersonUser);


router.post('/getUsername', getUsername);
router.get('/getUsuario/:id', getUsuario);
router.get('/getPersona/:id', getPersona);
//router.put('/putUser/:id', putUser);
router.put('/putUser/:id',
    [
        check('login', 'Introduzca el campo "Nombre de Usuario" ').not().isEmpty(),
        check('password', 'Introduzca el campo "Contraseña" ').not().isEmpty(),
        check('id_direccion', 'Seleccione la Dirección').not().isEmpty(),
        check('id_grupo', 'Seleccione el Grupo').not().isEmpty(),
        check('dep_trabajo', 'Seleccione la Sede de Trabajo').not().isEmpty(),
        ValidateFields
    ], putUser);

//router.put('/putUser2/:id', putUser2);
router.put('/putUser2/:id',
    [
        check('nombres', 'Introduzca el campo "Nombres" ').not().isEmpty(),
        check('apellido_paterno', 'Introduzca el campo "Apellido Paterno" ').not().isEmpty(),
        check('apellido_materno', 'Introduzca el campo "Apellido Materno" ').not().isEmpty(),
        check('numero_documento', 'Introduzca el campo "Número de Identidad" ').not().isEmpty().isNumeric().withMessage('El campo Número de Identidad debe ser numérico'),
        check('tipo_documento', 'Seleccione el Tipo de Documento').not().isEmpty(),
        check('correo', 'Introduzca el campo "Correo Electrónico" ').not().isEmpty().isEmail().withMessage('Correo Electrónico inválido'),
        ValidateFields
    ], putUser2);

router.put('/putUser3/:id', putUser3);

module.exports = router;