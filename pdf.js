'use strict';

var fs = require('fs');
var pdf = require('html-pdf');
var ejs = require('ejs');
var path = require('path');
const Promise = require('bluebird');

const QRCode = require('qrcode')

module.exports = {
    generarReporte,
    generarContrato,
    generarReporteEH2021,
    generarTDREncuestadorEH2021,
    generarReporteAuxEH2021
}



let options = {
    filename: 'test.pdf',
    format: 'Letter',
    border: {
        "top": "0cm", // defaul is 0, units: mm, cm, in, px
        "right": "2.17cm",
        "bottom": "0cm",
        "left": "2.17cm"
    },
    header: {
        "height": "47mm",
    },
    footer: {
        height: "2.1cm",
        contents: {
        }
    },
    "base": 'file:///D:'
};

let optionsC = {

    filename: 'testC.pdf',
    format: 'Letter',
    border: {
        "top": "0cm", // defaul is 0, units: mm, cm, in, px
        "right": "2.17cm",
        "bottom": "0cm",
        "left": "2.17cm"
    },
    header: {
        "height": "47mm",
    },
    footer: {
        height: "1.8cm",
        contents: {
            default:
                `
            <div style="text-align: center; font-size: 10px">
                Oficina Central La Paz<br>
                · Avenida José Carrasco N° 1391- Miraflores · Telf.: Piloto (591-2) 2222333 · Fax (591-2) 2222885 <br>
                · www.ine.gob.bo · @INEOficialBO · /ineboliviaoficial · ceninf@ine.gob.bo  
            </div>
            <div style="margin-left: 610px; text-align: center; font-size: 10px">Pág.{{page}}/{{pages}}</div>
            `
        }
    },
    "base": 'file:///D:'
};

async function generarReporte(datos) {

    let data = fs.readFileSync(path.join(__dirname, 'logo.png'), 'base64', 'utf8');
    var compiled = ejs.compile(fs.readFileSync(path.join(__dirname, 'termino_ref' + '.html'), 'utf8'));
    var html = compiled({ ...datos, data });

    return new Promise(async (resolve, reject) => {
        await pdf.create(html, options).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}
// generar tdr encuesta eh21021
async function generarReporteEH2021(datos) {

    let data = fs.readFileSync(path.join(__dirname, 'logo.png'), 'base64', 'utf8');
    var compiled = ejs.compile(fs.readFileSync(path.join(__dirname, 'termino_encuesta_eh2021' + '.html'), 'utf8'));
    var html = compiled({ ...datos, data });

    return new Promise(async (resolve, reject) => {
        await pdf.create(html, options).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}

// generar tdr auxiliar4 eh21021
async function generarReporteAuxEH2021(datos) {

    let data = fs.readFileSync(path.join(__dirname, 'logo.png'), 'base64', 'utf8');
    var compiled = ejs.compile(fs.readFileSync(path.join(__dirname, 'termino_auxiliar4' + '.html'), 'utf8'));
    var html = compiled({ ...datos, data });

    return new Promise(async (resolve, reject) => {
        await pdf.create(html, options).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}

// generar tdr supervisor de campo eh21021
async function generarTDREncuestadorEH2021(datos) {

    let data = fs.readFileSync(path.join(__dirname, 'logo.png'), 'base64', 'utf8');
    var compiled = ejs.compile(fs.readFileSync(path.join(__dirname, 'termino_supervisor_campo_eh2021' + '.html'), 'utf8'));
    var html = compiled({ ...datos, data });

    return new Promise(async (resolve, reject) => {
        await pdf.create(html, options).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}



async function generarContrato(datos) {
    var ex = [];
    for (let i in datos) {
        ex.push(datos[i])
    }
    /* QR */
    const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.95,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#FFF',
        },
    }
    //ex[0]: se obtiene el numero de qr del postulante
    let qrImage = await QRCode.toDataURL(`http://localhost:4000/${ex[0]}`, opts)
    let cleanQr = qrImage.replace("data:image/png;base64,", "")
    let data = fs.readFileSync(path.join(__dirname, 'logo.png'), 'base64', 'utf8');

    var compiled = ejs.compile(fs.readFileSync(path.join(__dirname, 'contrato' + '.html'), 'utf8'));
    var html = compiled({ ...datos, data, cleanQr });

    return new Promise(async (resolve, reject) => {
        await pdf.create(html, optionsC).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    });
}