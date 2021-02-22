import { TYPE_ALERT } from './values.config';
import Swal from 'sweetalert2';
/*la funcion basicAlert la usare en login.component en pages forms login y buscar el component */
export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '') {
    Swal.fire({
        title,
        icon,
        position: 'top',
        showConfirmButton: false,
        /*lo convertimos en notificación para que no salga en pantalla grande la notificación */
        toast: true,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
}
