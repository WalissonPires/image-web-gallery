import React from "react";
import { Popup } from "reactjs-popup";
import { Container } from "./styles";


export const Modal = ({ isOpened, children, closeOnDocumentClick }: ModalProps) => {

    const popupStyles: React.CSSProperties = {
        backgroundColor: 'rgba(0,0,0,.2)'
    }

    return (
    <Popup open={isOpened} overlayStyle={popupStyles} closeOnDocumentClick={closeOnDocumentClick ?? false}>
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