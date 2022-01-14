const { Router } = require('express');
const { check } = require('express-validator');
const { ValidateFields } = require('../middlewares/field-validation')

const { getTdr,
    getPreTdr,
    getPreTdrById,
    postTdr,
    postTdrPre,
    getCuadroEquivalencia,
    obtenerTdrPorId,
    putTdr, getPostulantes,
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
} = require('../controllers/unidad-solicitante/tdr.controller');

const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

router.get('/findIdConvInTdr/:id', findIdConvInTdr);
router.get('/', getTdr);
router.get('/getPreTdr', getPreTdr);
router.get('/getPreTdrById/:id', getPreTdrById); 
router.get('/proyecto', getProyecto);
router.get('/proyecto/:id', getProyectoById);
router.get('/direccion', getDireccion);
router.get('/cuadro-equivalencia', getCuadroEquivalencia);
router.get('/postulantes/:id', getPostulantes);
router.get('/:id', obtenerTdrPorId);
router.post('/add-pre', postTdrPre)
router.post('/add', 
            [
                check('modalidad_contratacion', 'Seleccione la Modalidad de Contratación').not().isEmpty(),
                check('objeto_contratacion', 'Introduzca el campo "Objeto de Contratación" ').not().isEmpty(),
                check('fecha_inicio', 'Seleccione la Fecha de Inicio').not().isEmpty(),
                check('fecha_inicio', 'Seleccione la Fecha de Inicio').not().isEmpty(),
                check('meses_contrato', 'Introduzca el campo "Meses de Contrato"').not().isEmpty().isNumeric().withMessage('El campo Meses de Contrato debe ser numérico'),
                check('dias_contrato', 'Introduzca el campo "Días de Contrato" ').not().isEmpty().isNumeric().withMessage('El campo Días de Contrato debe ser numérico'),
                check('id_proyecto', 'Seleccione el Proyecto').not().isEmpty(),
                check('id_cuadro_equivalencia', 'Seleccione la Denominación del Puesto').not().isEmpty(),
                check('sede_trabajo', 'Seleccione la Sede de Trabajo').not().isEmpty(),
                check('antecedentes', 'Introduzca el campo "Antecedentes" ').not().isEmpty(),
                check('justificacion', 'Introduzca el campo "Justificación"').not().isEmpty(),
                check('objetivo_consultoria', 'Introduzca el campo "Objetivo de la Consultoría"').not().isEmpty(),
                check('funciones', 'Introduzca el campo "Funciones y/o Actividades" ').not().isEmpty(),
                check('perfil_formacion_min', 'Introduzca el campo "Formación Mínima Obligatoria"').not().isEmpty(),
                check('perfil_exp_gral', 'Introduzca el campo "Experiencia General" ').not().isEmpty(),
                check('perfil_exp_esp', 'Introduzca el campo "Experiencia Expecífica" ').not().isEmpty(),
               // check('perfil_cursos_req', 'Introduzca el campo "Cursos Requeridos"').not().isEmpty(),
                check('documentos_presentar', 'Introduzca el campo "Documentos a Presentar"').not().isEmpty(),
                ValidateFields
            ], postTdr) 

router.get('/getPostulantes/:id', getPostulantesSeleccionados);
//router.put('/put/:id', putTdr);
router.put('/putTdrPre/:id', putTdrPre);
router.put('/putCorrelativo/:id', putCorrelativo);

router.put('/put/:id', 
            [
                check('modalidad_contratacion', 'Seleccione la Modalidad de Contratación').not().isEmpty(),
                check('objeto_contratacion', 'Introduzca el campo "Objeto de Contratación" ').not().isEmpty(),
                check('fecha_inicio', 'Seleccione la Fecha de Inicio').not().isEmpty(),
                check('fecha_inicio', 'Seleccione la Fecha de Inicio').not().isEmpty(),
                check('meses_contrato', 'Introduzca el campo "Meses de Contrato"').not().isEmpty().isNumeric().withMessage('El campo Meses de Contrato debe ser numérico'),
                check('dias_contrato', 'Introduzca el campo "Días de Contrato" ').not().isEmpty().isNumeric().withMessage('El campo Días de Contrato debe ser numérico'),
                check('id_proyecto', 'Seleccione el Proyecto').not().isEmpty(),
                check('id_cuadro_equivalencia', 'Seleccione la Denominación del Puesto').not().isEmpty(),
                check('sede_trabajo', 'Seleccione la Sede de Trabajo').not().isEmpty(),
                check('antecedentes', 'Introduzca el campo "Antecedentes" ').not().isEmpty(),
                check('justificacion', 'Introduzca el campo "Justificación"').not().isEmpty(),
                check('objetivo_consultoria', 'Introduzca el campo "Objetivo de la Consultoría"').not().isEmpty(),
                check('funciones', 'Introduzca el campo "Funciones y/o Actividades" ').not().isEmpty(),
                check('perfil_formacion_min', 'Introduzca el campo "Formación Mínima Obligatoria"').not().isEmpty(),
                check('perfil_exp_gral', 'Introduzca el campo "Experiencia General" ').not().isEmpty(),
                check('perfil_exp_esp', 'Introduzca el campo "Experiencia Expecífica" ').not().isEmpty(),
                check('perfil_cursos_req', 'Introduzca el campo "Cursos Requeridos"').not().isEmpty(),
                check('documentos_presentar', 'Introduzca el campo "Documentos a Presentar"').not().isEmpty(),
                ValidateFields
            ], putTdr)

router.post('/add/fuc', 
            [
                check('forma_adjudicacion', 'Seleccione la Forma de Adjudicación').not().isEmpty(),
                check('id_postulantes', 'Seleccione un Postulante').not().isEmpty(),
                check('metodo_seleccion_adjudicacion', 'Seleccione un Método de Selección y Adjudicación').not().isEmpty(),
                ValidateFields
            ], postFuc

);
router.get('/getfuc/:id', obtenerFucPorId);
router.get('/buscar-id-tdr-fuc/:id', getTdrTableFuc);

module.exports = router;