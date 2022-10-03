import React from "react";
import { Popup } from "reactjs-popup";
import { Container } from "./styles";


export const Modal = ({ isOpened, children, closeOnDocumentClick }: ModalProps) => {

    return (
    <Popup open={isOpened} closeOnDocumentClick={closeOnDocumentClick ?? false}>
        <Container>
            {children}
        </Container>
    </Popup>
    );
}

export type ModalProps = {
    closeOnDocumentClick?: boolean;
    isOpened: boolean;
    children: React.ReactNode;
}