import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);
        Swal.fire({
            title: 'Estas seguro de querer borrarlo?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si,borralo!',
            cancelButtonText: 'No,cancelar'
        }).then((result) => {
            if (result.value) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // console.log(url);
                axios.delete(url, { params: { urlProyecto } })
                    .then(function (respuesta) {
                        console.log(respuesta);
                        Swal.fire(
                            'Borrado!',
                            respuesta.data,
                            'success'
                        );
                        //dirreccionar al incio

                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text:'No se pudo borrar un proyecto'
                    })
                })


            }
        })
    })

}

export default btnEliminar;