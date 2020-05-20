const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales: testimoniales
    })

}

exports.agregarTestimoniales = async (req, res) => {
    //validad que los campos este llenos
    let { nombre, email, mensaje } = req.body;
    //arrray para guardar los errores
    let errores = [];
    if (!nombre) {
        errores.push({ 'mensaje': 'Agrega tu Nombre' })
    }
    if (!email) {
        errores.push({ 'mensaje': 'Agrega tu Email' })
    }
    if (!mensaje) {
        errores.push({ 'mensaje': 'Agrega tu Mensaje' })
    }

    //revisar por error

    if (errores.length > 0) {
        //muestra la va con errores
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            email,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })




    } else {
        //almacenar en la base de datos
        Testimonial.create({
            nombre,
            email,
            mensaje
        })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));

    }








}