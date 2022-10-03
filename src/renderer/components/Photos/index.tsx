import React from "react";
import { Container, PhotoActions, PhotoImage, PhotoInfo, PhotoItem, PhotoTitle } from "./styles";

export const Photos = ({ photos, onItemlick, renderActions }: PhotosProps) => {

    return (
        <Container>
            {photos.map(photo =>
                <PhotoItem key={photo.id} active={photo.selected}>
                    <PhotoImage imageUrl={photo.imageUrl} onClick={() => onItemlick(photo)} />
                    <PhotoInfo>
                        <PhotoTitle>{photo.name}</PhotoTitle>
                        <PhotoActions>
                            {renderActions?.(photo)}
                        </PhotoActions>
                    </PhotoInfo>
                </PhotoItem>)}
        </Container>
    );
}


export type PhotosProps = {
    photos: PhotoData[];
    onItemlick: (item: PhotoData) => void;
    renderActions?: (item: PhotoData) => React.ReactNode;
}


export type PhotoData = {
    id: string;
    name: string;
    imageUrl: string;
    selected?: boolean;
}