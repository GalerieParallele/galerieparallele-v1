import Swal from "sweetalert2";
import CONFIG from "@/constants/CONFIG";

export const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: CONFIG.TOAST_DURATION,
    timerProgressBar: false,
});
