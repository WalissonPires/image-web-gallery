import { useState } from "react";
import { Photo } from "../../main/domain/entities/photo";


export const useViewer = ({ photos, onLastPhotoViewed }: UseViewerParams) => {

    const [ currentPhotoId, setCurrentPhotoId ] = useState<Photo["id"] | null>(null);

    const handleShowViewer = (photoId: Photo["id"]) => {

        setCurrentPhotoId(photoId);
    }

    const handlePreviousPhoto = () => {

        const currentPhotoIndex = photos.findIndex(x => x.id === currentPhotoId);
        const previousPhotoIndex = currentPhotoIndex - 1;

        if (previousPhotoIndex < 0)
            return;


        setCurrentPhotoId(photos[previousPhotoIndex].id);
    }

    const handleNextPhoto = () => {

        const currentPhotoIndex = photos.findIndex(x => x.id === currentPhotoId);
        const nextPhotoIndex = currentPhotoIndex + 1;

        if (nextPhotoIndex > (photos.length - 1)) {

            onLastPhotoViewed?.();
            return;
        }

        setCurrentPhotoId(photos[nextPhotoIndex].id);
    }

    const handleCloseViewer = () => setCurrentPhotoId(null);

    return {
        handlePreviousPhoto,
        handleNextPhoto,
        handleCloseViewer,
        handleShowViewer,
        currentPhotoId,
        closeViewer: () => setCurrentPhotoId(null)
    }
}

export type UseViewerParams = {
    photos: Photo[];
    onLastPhotoViewed?: () => void;
}