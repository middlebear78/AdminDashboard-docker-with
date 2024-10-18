import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Toast {
    public notify(message: string, options: ToastOptions = {}) {
        toast(message, options);
    }

    public success(message: string, options: ToastOptions = {}) {
        toast.success(message, options);
    }

    public error(message: string, options: ToastOptions = {}) {
        toast.error(message, options);
    }

    public info(message: string, options: ToastOptions = {}) {
        toast.info(message, options);
    }

    public warning(message: string, options: ToastOptions = {}) {
        toast.warn(message, options);
    }
}

export const toastify = new Toast();
