import React from "react";
import { Check, X } from "react-feather";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";


export const ConfirmModal = ({ isOpened, message, onResponse }: ConfirmModalProps) => {

    return (
        <Modal isOpened={isOpened}>
            <h2 style={{ marginBottom: '10px' }}>{message}</h2>
            <IconButton onClick={() => onResponse(true)}><Check style={{ marginRight: "5px" }} /> Confirmar</IconButton>
            <IconButton onClick={() => onResponse(false)} style={{ marginLeft: "10px" }}><X style={{ marginRight: "5px" }} /> Cancelar</IconButton>
        </Modal>
    );
}

export type ConfirmModalProps = {
    isOpened: boolean;
    message: string;
    onResponse: (confirmed: boolean) => void;
}