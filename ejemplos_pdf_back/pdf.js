'use strict';

var fs = require('fs');
var pdf = require('html-pdf');
var ejs = require('ejs');
var path = require('path');
const Promise = require('bluebird');


module.exports = {
    generarReporte
}

let options = { 
    format: 'Letter',
    border: {
        "top": "0cm", // defaul is 0, units: mm, cm, in, px
        "right": "3.17cm",
        "bottom": "2.54cm",
        "left": "3.17cm"
    },
    header: {
        "height": "37mm",
    },
    footer: {
        height: "2.1cm",
        contents: {
        }
    },
    "base": 'file:///D:'
};
//var imgSrc = path.join('file://', __dirname, 'tcpdf_logo.jpg');

async function generarReporte (reporte, tituloReporte, datos) {
    const posibles = ['historico', 'historial', ''];
    let data = fs.readFileSync(path.join( __dirname, 'logo.png'), 'base64', 'utf8');
    var compiled = ejs.compile(fs.readFileSync(path.join( __dirname, 'reporte_' + reporte + '.html'), 'utf8'));
    var html = compiled({ ...datos, tituloReporte,  data });
    return new Promise(async (resolve, reject) => {
        await pdf.create(html, options).toBuffer(async (err, buffer) => {
            if (err) {
                console.log('salida--->>>>>>>>>>>>>' + err);
                console.log('salidafin---------- generacion pdf');
            } else {
                resolve(buffer.toString('base64'));
            }
        });
    }); 
}