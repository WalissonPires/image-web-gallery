import React, { useRef, useState } from "react";
import { ConfirmModal } from "..";

export const useConfirmModal = () => {

    const [ message, setMessage ] = useState<string | null>(null);
    const onResponseRef = useRef<(confirmed: boolean) => void>();
    const isOpened = !!message;

    const handleResponse = (confirmed: boolean) => {

        setMessage(null);
        onResponseRef.current?.(confirmed);
    }

    const confirmModal = <ConfirmModal isOpened={isOpened} message={message ?? ''} onResponse={handleResponse} />;

    return {
        confirmModal,
        openConfirmModal: (message: string, onResponse: (confirmed: boolean) => void) => {

            onResponseRef.current = onResponse;
            setMessage(message);
        },
        closeConfirmModal: () => setMessage(null)
    };
}