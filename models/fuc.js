var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FucSchema = ({
    id_formulario_contratacion: Number,
    id_termino_referencia: Number,
    id_postulantes: Number,
    forma_adjudicacion: Number,
    metodo_seleccion_adjudicacion: Number,
    created_at: String,
    updated_at: String,
    pac: String,
    correlativo: Number 
});

module.exports = mongoose.model('Fuc', FucSchema);