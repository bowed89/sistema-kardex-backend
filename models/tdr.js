var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TdrSchema = ({
    id_cuadro_equivalencia: Number,
    id_proyecto: Number,
    id_gestion: Number,
    sede_trabajo: String,
    objeto_contratacion: String,
    modalidad_contratacion: String,
    fecha_inicio: String,
    meses_contrato: Number,
    dias_contrato: Number,
    antecedentes: String,
    justificacion: String,
    objetivo_consultoria: String,
    resultados_esperados: String,
    funciones: String,
    actividades: String,
    perfil_formacion_min: String,
    perfil_cursos_req: String,
    perfil_exp_gral: String,
    perfil_exp_esp: String,
    documentos_presentar: String,
    usuario: String,
    expgen_anio: Number,
    expgen_mes: Number,
    expesp_anio: Number,
    expesp_mes: Number,
    id_tdr_principal: Number,
    id_usuarios: Number,
    created_at: String,
    updated_at: String,
    referencia: String,//
    sueldo_total: String,
    area: String,
    honorarios_me: String,
    lugar_horario: String,
    supervision_dep: String
});

module.exports = mongoose.model('Tdr', TdrSchema);