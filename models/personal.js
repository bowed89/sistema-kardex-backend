var mongoose = require('mongoose');

var PersonalSchema = ({
    nombres: { type: String, required: [true, 'Ingrese el Nombre'], unique: false },
    ap_paterno: { type: String, required: true, unique: false },
    ap_materno: { type: String, required: true, unique: false },
    ci: { type: Number, required: true, unique: true },
    celular: { type: Number, required: true, unique: false },
    telefono: { type: Number, required: false, unique: false },
    extension: { type: String, required: true, unique: false },
    fecha_nacimiento: { type: Date, required: true, unique: false },
    edad: { type: Number, required: false, unique: false },
    estado_civil: { type: String, required: false, unique: false },
    nacionalidad: { type: String, required: false, unique: false },
    lugar_nacimiento: { type: String, required: false, unique: false },
    zona: { type: String, required: false, unique: false },
    ciudad: { type: String, required: false, unique: false },
    email: {
        type: String,
        required: [true, 'Ingrese el Email'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Formato del Email invalido'],
        validate: {
            validator: function (v) {
                return this.model('Personal').findOne({ email: v }).then(user => !user)
            },
            message: props => `${props.value} El Email está siendo usado por otro usuario`
        },
    },
    domicilio: { type: String, required: false, unique: false },
    profesion: { type: String, required: false, unique: false },
    tipo_sangre: { type: String, required: false, unique: false },
    medicamento_alergia: { type: String, required: false, unique: false },
    barrio: { type: String, required: false, unique: false },
    edificio: { type: String, required: false, unique: false },
    piso: { type: String, required: false, unique: false },
    edificio_dpto: { type: String, required: false, unique: false },
    casilla: { type: String, required: false, unique: false },

});

module.exports = mongoose.model('Personal', PersonalSchema);


