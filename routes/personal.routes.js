const { Router } = require('express');

const { 
        postPersonal, 
        getPersonal, 
        getPersonalById, 
        getDependientesById,
        putPersonal, 
        putConyugue,
        postConyugue,
        getConyugueById,
        postDependiente,
        postEducacion,
        postExperiencia,
        putDependiente,
        getEducacionById,
        putEducacion,
        deleteEducacion,
        deleteDependiente,
        getExperienciaLaboralById,
        putExperienciaLaboral,
        postDocumentos,
        getDocumentoByName,
        getDocumentoByIdPersonal,
        deleteDocumento

        
    } = require('../controllers/datos-personales/personal.controller');

const router = Router();

router.post('/', postPersonal)
router.get('/', getPersonal)
router.get('/getdocumento', getDocumentoByName)
router.post('/getdocumentoid', getDocumentoByIdPersonal)

router.get('/:id', getPersonalById),
router.put('/:id', putPersonal)
router.get('/conyugue/:id', getConyugueById),
router.put('/conyugue/:id', putConyugue)
router.post('/conyugue', postConyugue)
router.post('/dependiente', postDependiente)
router.post('/educacion', postEducacion)
router.post('/experiencia', postExperiencia)
router.get('/dependiente/:id', getDependientesById)
router.get('/experienciaLaboral/:id', getExperienciaLaboralById),
router.post('/dependienteUpdate', putDependiente)
router.get('/educacion/:id', getEducacionById)
router.post('/educacionUpdate', putEducacion)
router.post('/experienciaLaboralUpdate', putExperienciaLaboral)
router.post('/educacionDelete', deleteEducacion)
router.post('/dependienteDelete', deleteDependiente)
router.post('/deletedocumento', deleteDocumento)

router.post('/documentos', postDocumentos)

module.exports = router;
