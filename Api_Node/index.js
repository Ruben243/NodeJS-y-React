'use strict'

const mongoose=require('mongoose');
const app=require('./app');
const port=3900;

mongoose.set('useFindAndModify',false);
mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://user:pass@cluster0.vzqha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log('conectado al abase de datos de la api!!!!');
    //crear servidor y escuchar peticiones
    app.listen(port,()=>{
        console.log('servidor on¡¡¡'+ port);
    })
});
