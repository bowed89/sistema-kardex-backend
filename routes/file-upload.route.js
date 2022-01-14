'use strict';
var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');
var fs = require('fs');
const path = require('path');

let util = require('util');
const readFile = util.promisify(fs.readFile);

router.use(fileupload());

router.post('/', function (req, res) {
    console.log('body==>', req.body);
    if(req.body.tipo_memo) {
        req.files.photo.name = `${req.body.tipo_memo}_${req.files.photo.name}`
        console.log('req.files.name', req.files.photo.name);
    }
    console.log('req.files ===> ', req.files);

    if (req.files.photo == undefined || req.files.photo == null) {
        console.log('No existe archivo!');
        res.status(415).send();
    }
    const file = req.files.photo;
    let directory = `./Uploads/${req.body.nombrePersonal}/${req.body.tipoProceso}/`;
    console.log('directory', directory);

    //Crea un directorio sino existe ...
    if (!fs.existsSync(directory)) {
        fs.mkdir(directory, { recursive: true }, err => { console.log('error al creacer directorio', err); })
        // fs.mkdirSync(directory, {isRelativeToScript: true}); /* Crea una carpeta  */
    }
    // if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ||  file.mimetype == 'application/pdf') {
    if (file.mimetype == 'application/pdf' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        file.mv(directory + file.name, function (error, response) {
            if (error) {
                console.log('error :( =>', error);
                res.status(202).send();
            }
            else {
                console.log('file.name', file.name);
                let fileLocation = path.join(__dirname, `${directory}` + file.name)
                // let fileLocation = path.join(__dirname, `.${directory}` + file.name)
                res.status(200).json({
                    response: req.files,
                    url: fileLocation
                })
            }
        });
    }
    else {
        res.status(415).send();
    }
});

router.get('/images/:name', (req, res) => {
    let name = req.params.name
    console.log('name', name);
    let fileLocation = path.join(__dirname, '../Uploads/' + name)
    console.log('fileLocation', fileLocation);
    res.sendFile(fileLocation)
});

router.post('/images', (req, res, next) => {
    let url = req.body.url;
    let completeUrl = path.join(__dirname, url);
    var fileNames = [];
    var fileNames2 = [];
    let filepath;

    try {
        if (fs.existsSync(completeUrl)) {
            console.log("Existe Directorio, sigue con el proceso...")
            fileNames = fs.readdirSync(completeUrl); // obtenemos los nombres de los archivos de la carpeta 
            fileNames2 = fs.readdirSync(completeUrl); // obtenemos los nombres de los archivos de la carpeta 

            console.log('fileNames', fileNames);
            const files = fileNames.map((filename) => {
                // armamos toda la ruta mas el nombre del archivo, ej:
                //filepath D:\jmlopez\Documents\sdp\backend-sdp\Uploads\datos-personales\sigma\Jesus Michael Lopez Averanga\avatar-11.jpg
                filepath = path.join(__dirname, url + '/' + filename)

                return readFile(filepath, { encoding: 'base64' });//devuelve valores a base64
            });
            Promise.all(files).then(fileNames => {
                let response = fileNames;
                let array = []
                for (let i in response) {
                    array.push(Buffer.from(response[i], "base64"))
                }
                console.log('array ', array);

                res.status(200).json({
                    response,
                    array,
                    fileNames2
                })
            }).catch(error => {
                res.status(400).json(error);
            });

        } else {
            console.log("No existe directorio, crea nuevas carpetas ...")
            res.status(200).json({
                res: "No existe Directorio"
            })
            return 0;
        }
    } catch (error) {
        console.log("Error", error)
    }
});

module.exports = router;