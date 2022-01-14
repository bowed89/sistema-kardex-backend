const { Router } = require('express');
const { ValidateFields } = require('../middlewares/field-validation');
const { check } = require('express-validator');

const {
    getAllNotaAdj,
    getNotaById,
    postContrato,
    findIdFucInContrato,
    postInformeLegal,
    findIdFucInInforme,
    getFucTableInforme,
    getInformeById,
    getInformeId,
    getNotaByQr,
    putInformeLegal

} = require('../controllers/unidad-solicitante/asesoria.controller');

const router = Router();
router.get('/getAllNotaAdj', getAllNotaAdj)
router.post('/postContrato', postContrato)

router.put('/putInformeLegal/:id', 
    [
        check('ci', 'Seleccione la Cédula de Identidad').not().isEmpty(),
        check('nota_aceptacion', 'Seleccione la Nota de Aceptación').not().isEmpty(),
        check('sippase', 'Seleccione el Certificado SIPPASE').not().isEmpty(),
        check('sin', 'Seleccione el Certificado de Inscripción en el SIN o solicitud de retención').not().isEmpty(),
        check('nua', 'Seleccione el NUA').not().isEmpty(),
        check('rupe', 'Seleccione el Certificado RUPE').not().isEmpty(),
    ], putInformeLegal)


router.post('/postInformeLegal',
    [
        check('id_formulario_contratacion', 'id_formulario_contratacion').not().isEmpty(),
        check('ci', 'Seleccione la Cédula de Identidad').not().isEmpty(),
        check('nota_aceptacion', 'Seleccione la Nota de Aceptación').not().isEmpty(),
        check('sippase', 'Seleccione el Certificado SIPPASE').not().isEmpty(),
        check('sin', 'Seleccione el Certificado de Inscripción en el SIN o solicitud de retención').not().isEmpty(),
        check('nua', 'Seleccione el NUA').not().isEmpty(),
        check('rupe', 'Seleccione el Certificado RUPE').not().isEmpty(),
        ValidateFields
    ], postInformeLegal)

router.get('/getNotaById/:id', getNotaById)
router.get('/findIdFucInContrato/:id', findIdFucInContrato)
router.get('/findIdFucInInforme/:id', findIdFucInInforme)
router.get('/getFucTableInforme/:id', getFucTableInforme)
router.get('/getInformeById/:id', getInformeById)
router.get('/getInformeId/:id', getInformeId)
router.get('/getNotaByQr/:id', getNotaByQr)

module.exports = router;