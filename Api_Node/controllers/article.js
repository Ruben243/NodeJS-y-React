'use strict'

const validator = require('validator');
const Article = require('../models/article');
const fs = require('fs');
const path = require('path');
const { search } = require('../routes/article');
const { error } = require('console');
const controller = {
    datosCurso: (req, res) => {
        let hola = req.body.hola;
        return res.status(200).send({
            proyecto: "Api Rest Full",
            autor: "Ruben Gines",
            hola: hola
        });

    },
    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion de text de mi controlador de articulos'
        });
    },
    save: (req, res) => {
        //recojer paramtros por post
        const params = req.body;


        //validar datos
        try {
            const validate_title = !validator.isEmpty(params.title);
            const validate_content = !validator.isEmpty(params.content);

            if (validate_title && validate_content) {
                //crear el objeto a guardar
                const article = new Article();


                // asignar valores
                article.title = params.title;
                article.content = params.content;
                article.image = "";


                // guardar el articulo
                article.save((error, articleStored) => {
                    if (error || !articleStored) {
                        return res.status(200).send({
                            status: 'error',
                            message: "Fallo al guardar"
                        });
                    }
                });

                // Devolver respuesta
                return res.status(200).send({
                    status: 'sucess',
                    article
                });


            }

        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });


        }







    },///end save

    getArticles: (req, res) => {
        const query = Article.find({});
        const last = req.params.last;
        console.log(last);
        if (last || last != undefined) {
            query.limit(5);
        }
        //Find para obtener los datos
        query.sort('-id').exec((error, articles) => {
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener los articulos'
                });
            } else if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No ahi articulos que mostrar'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                articles
            });
        })

    },

    getArticle: (req, res) => {

        // recojr id
        const articleId = req.params.id;
        // buscar articulo
        Article.findById(articleId, (error, article) => {
            // si hay error o si no exite el articulo
            if (error) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error con el id'
                });
            } else if (!article) {
                return res.status(500).send({
                    status: 'error',
                    message: 'No existe el articulo'
                })


            }
            // si esta todo bien y hay articulos y devolverlo e json
            return res.status(200).send({
                status: 'sucess',
                article
            });


        })
    },

    update: (req, res) => {

        // recojer el parametro id
        const articleId = req.params.id;
        // recojer los datos
        const params = req.body;

        // validar
        try {
            const validate_title = !validator.isEmpty(params.title);
            const validate_content = !validator.isEmpty(params.content);
            if (validate_title && validate_content) {
                // devolver respuesta
                Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (error, article) => {
                    if (error || !article) {
                        return res.status(500).send({
                            status: 'error',
                            message: "ha ocurrido un error"
                        });
                    }

                    return res.status(200).send({
                        status: 'sucess',
                        article
                    });
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos'
            });
        }
    },

    delete: (req, res) => {
        // recojer el parametro id
        const articleId = req.params.id;

        //   find&delete
        Article.findByIdAndDelete({ _id: articleId }, (error, article) => {
            if (error || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Algo ha fallado'
                });
            }

            return res.status(200).send({
                status: 'sucess',
                article
            });

        })

    },
    upload: (req, res) => {
        // confgurar el modulo connecmultiparty//  router/article.js(hecho)
        let file_name = "Imagen no subida";
        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            })
        }

        // conseguir nombre y extension archivo
        const file_path = req.files.image.path;
        const file_split = file_path.split('/');
        file_name = file_split[2];
        const extension_split = file_name.split('.');
        const file_ext = extension_split[1]

        // solo imagenes
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'gif') {
            //borrar archivo
            fs.unlink(file_path, (error) => {
                return res.status(404).send({
                    status: 'Error',
                    message: "la extension del archiv no es valida"
                });
            });
        } else {
            const articleId = req.params.id;
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (error, article) => {
                if (error) {
                    return res.status(404).send({
                        status: 'Error',
                        message: "Error al guardar la imagen"
                    });
                }
                // si es valido buscamos artculo asignar el nombre de la imagen y actualizarlo
                return res.status(200).send({
                    status: 'sucess',
                    article
                });

            })
        }

    },
    getImage: (req, res) => {
        const file = req.params.image;
        const path_file = './upload/articles/' + file;
        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'Error',
                message: "La imagen no existe"
            });
        }

    },

    search: (req, res) => {
        //sacar el string a buscar
        const searchString = req.params.search;
        //find
        Article.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['date', 'descending']])
            .exec((error, articles) => {
                if (error) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la peticion'
                    });

                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No hay articulos"
                    });
                }
                return res.status(200).send({
                    status: 'sucess',
                    articles
                });

            })

    }

};//end controller

module.exports = controller;