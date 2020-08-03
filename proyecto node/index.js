const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// importar variables
require('dotenv').config({ path: 'variables.env' });



//helpers con algunas funciones
const helpers = require('./views/helpers');


//importar el modelo
require('./models/Proyectos')
//importar modelo de tareas
require('./models/Tareas');

require('./models/Usuarios');


//crear conexion a la base de datos
const db = require('./config/db');



//crea la estructura de la tabla sql
db.sync()
    .then(() => console.log('conectado al server'))
    .catch(error => console.log(error))

//crear una aplicacion exress
const app = express();
//habilitar pug
app.set('view engine', 'pug');
//donde cargar los archivos staticos css o img
app.use(express.static('public'));
//habilitar bodyParser para leer el formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

//añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash mesages
app.use(flash());

app.use(cookieParser());

//session nos permite navegar entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//pasar var_dump a la aplicacion
app.use((req, res, next) => {
    console.log(req.user);
    const fecha = new Date();
    res.locals.year = fecha.getFullYear()
    res.locals.vardump = helpers.var_dump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    console.log(res.locals.usuario);
    next();
})


app.use('/', routes());




const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('******SERVIDOR EN LINEA*********');
});