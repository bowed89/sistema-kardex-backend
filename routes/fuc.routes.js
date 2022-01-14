const { Router } = require('express');
const { getFuc,
        postFuc,
        getPoaById,
        getDireccionDuser,
        getFucTablePoa,
        getFucRrhh,
        getFucByIdTdr,
        getDatasForFucById,
        putPoa
} = require('../controllers/unidad-solicitante/fuc.controller');
const router = Router();
const { check } = require('express-validator');
const { ValidateFields } = require('../middlewares/field-validation')


router.get('/', getFuc);
router.get('/getDatasForFucById/:id', getDatasForFucById);
router.get('/direccion-user/:id', getDireccionDuser);
router.get('/getFucRrhh', getFucRrhh);
router.get('/getPoa/:id', getPoaById);
router.get('/getFucByIdTdr/:id', getFucByIdTdr);
//router.post('/add', postFuc)
router.post('/add', [
        check('id_formulario_contratacion', '¿id_formulario_contratacion?').not().isEmpty(),
        check('fecha_solicitud', 'Seleccione la Fecha de Solicitud').not().isEmpty(),
        check('accion_corto_plazo', 'Introduzca el campo "Acción a Corto Plazo" ').not().isEmpty(),
        check('resultado_esperado', 'Introduzca el campo "Resultados Esperados" ').not().isEmpty(),
        check('operacion', 'Introduzca el campo "Operación" ').not().isEmpty(),
        check('tdr', 'Seleccione si el TDR está correcto').not().isEmpty(),
        check('fuc', 'Seleccione si el FUC está correcto').not().isEmpty(),
        check('hoja_vida', 'Seleccione si la Hoja de Vida está correcta').not().isEmpty(),
        ValidateFields
        ], postFuc)
        
router.put('/putPoa/:id', putPoa);

router.get('/buscar-id-fuc-poa/:id', getFucTablePoa);


module.exports = router;