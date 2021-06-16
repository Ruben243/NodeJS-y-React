'use strict'

//cargar modulos de node
const express = require('express');



//ejecutar express
const app = express();

//cargar las rutas
const article_routes=require('./routes/article');

//cargar middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//añadir prefijos a las rutas/cargar rutas
app.use('/api',article_routes); //la ruta quedaria ej: /api/datos-curso



//exportar el modulo(fichero actual)
module.exports = app;