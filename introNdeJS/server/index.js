//importar EXPRESS
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
require('dotenv').config({ path: 'variables.env' })


//configurar EXPRESS
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//Añadir el directorio de las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpata llamada public
app.use(express.static('public'));

//validar si estamos en ambiente de desarrollo o produccion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;


//Muestra la fecha actual y genera la ruta para saber donde estamos
app.use((req, res, next) => {
    //crear nueva fecha
    const fecha = new Date()
    res.locals.fechaActual = fecha.getFullYear();
    //saber la ruta
    res.locals.ruta = req.path;
    return next();
})


//ejecutamos el body parser
app.use(bodyParser.urlencoded({ extended: true }));

//req lo que pides a la pagina res la respuesta de la pagina
//use responde a todos los verbos de http(post get put etc) get solo responde a GET
//cargar las rutas
app.use('/', routes())

app.listen(3000);
