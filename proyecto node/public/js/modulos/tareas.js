import axios from 'axios';
import Swal from 'sweetalert2'
import { actualizarAvance } from '../funciones/avance';
const tareas = document.querySelector('.listado-pendientes');


if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //request  hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`

            axios.patch(url, { idTarea })
                .then(function (respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo')

                        actualizarAvance();
                    }
                })

        }

        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;
            Swal.fire({
                title: 'Estas seguro de borrar esta tarea?',
                text: "Esta accion no se puede deshacer!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si,borrala!',
                cancelButtonText: 'No,cancelar'
            }).then((result) => {
                if (result.value) {
                    //enviar el delte por medio de axio
                    const url = `${location.origin}/tareas/${idTarea}`

                    axios.delete(url, { params: { idTarea } })
                        .then(function (respuesta) {
                            console.log(respuesta);
                            if (respuesta.status === 200) {
                                //eliminar el nodo de la tarea
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //opcional alerta
                                Swal.fire(
                                    'Tarea eliminada',
                                    respuesta.data,
                                    'success'
                                )
                                actualizarAvance();
                            }
                        })

                }
            })
        }
    });

}

export default tareas;