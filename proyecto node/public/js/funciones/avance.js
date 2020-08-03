import Swal from "sweetalert2";

export const actualizarAvance = () => {
    // seleccionar tareas existentes
    const tareas = document.querySelectorAll('li.tarea');
    // seleccionar comlpletadas
    if (tareas.length) {
        const tareasCompletas = document.querySelectorAll('i.completo');
        // calcular avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
        // mostrar avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';
        if (avance === 100) {
            Swal.fire(
                'Completaste el proyecto',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }

}
