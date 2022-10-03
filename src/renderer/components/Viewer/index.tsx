import React from "react"
import { ChevronLeft, ChevronRight, X as Close } from "react-feather";
import { CloseButton, Container, NextButton, PhotoImg, PhotoImgWrapper, PreviousButton } from "./styles";


export const Viewer = ({ photos, currentPhotoId, onPreviousClick, onNextClick, onCloseClick }: ViewerProps) => {

    const currentPhoto = photos.find(x => x.id === currentPhotoId);

    return (
        <Container>
            <PreviousButton onClick={onPreviousClick}><ChevronLeft /></PreviousButton>
            <PhotoImgWrapper>
                <PhotoImg src={currentPhoto?.imageUrl} />
            </PhotoImgWrapper>
            <NextButton onClick={onNextClick}><ChevronRight /></NextButton>
            <CloseButton onClick={onCloseClick}><Close /></CloseButton>
        </Container>
    )
}

export type ViewerProps = {
    photos: PhotoItem[];
    currentPhotoId: string;
    onPreviousClick: () => void;
    onNextClick: () => void;
    onCloseClick: () => void;
}

export type PhotoItem = {
    id: string;
    name: string;
    imageUrl: string;
}