import { useState, useRef } from "react";

export function useToast() {
    const [toast, setToast] = useState('');
    const [toastVisible, settoastVisible] = useState(false);
    const toastTimeout = useRef(null);
    const hideTimeout = useRef(null);

    function showToast(text) {
        clearTimeout(toastTimeout.current);
        clearTimeout(hideTimeout.current);

        setToast(text);
        settoastVisible(true);

        hideTimeout.current = setTimeout(() => {
            settoastVisible(false);
        }, 4500);

        toastTimeout.current = setTimeout(() => {
            setToast("");
        }, 5500);
    }
    return {
        toast,
        toastVisible,
        showToast
    };
}