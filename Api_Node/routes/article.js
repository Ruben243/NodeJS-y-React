'use strict'

const express=require('express');
const ArticleController=require('../controllers/article');
const router=express.Router();
//Modulos para subir imagenes
const multipart=require('connect-multiparty');
const md_uploaded=multipart({uploadDir:'./upload/articles'});

//rutas pruebas
router.get('/test-de-controller',ArticleController.test);
router.post('/datos-curso',ArticleController.datosCurso);

//rutas para articulos funcionales
router.post('/save',ArticleController.save);
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.update);
router.delete('/article/:id',ArticleController.delete);
router.post('/upload-image/:id',md_uploaded,ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);



module.exports=router;