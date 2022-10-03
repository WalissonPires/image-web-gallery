import { toast, ToastOptions } from "react-toastify";


export abstract class Notify {

    private static _defaultConfig: ToastOptions = {
        position: "bottom-center",
        hideProgressBar: true,
        theme: 'dark'
    };

    public static error(message: string) {

        toast.error(message, Notify._defaultConfig);
    }

    public static warning(message: string) {

        toast.warn(message, Notify._defaultConfig);
    }

    public static info(message: string) {

        toast.info(message, Notify._defaultConfig);
    }

    public static success(message: string) {

        toast.success(message, Notify._defaultConfig);
    }
}