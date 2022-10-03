import { useEffect, useState } from "react"
import { TryPromise } from "../../../../common/promises/try-promise";
import { Photo } from "../../../../main/domain/entities/photo";
import { GetPhotosInput } from "../../../../main/domain/use-cases/gallery/get-photos-types";
import { GalleryClient } from "../../../main-client/gallery";


export const usePhotos = ({ limit }: UsePhotosParams) => {

    const [ offset, setOffset ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ photos, setPhotos ] = useState<Photo[]>([]);

    useEffect(() => {

        let canceled = false;

        const getPhotos = async () => {

            console.log('[usePhotos] Getting photos', { offset, limit, canceled });
            const client = new GalleryClient();

            setIsLoading(true);
            const { result, error } = await TryPromise.try(client.getPhotos(new GetPhotosInput(offset, limit)));
            setIsLoading(false);

            if (canceled)
                return;

            if (error) {
                alert(error.message);
                return;
            }

            if (offset === 0)
                setPhotos(result.data);
            else
                setPhotos(photos => photos.concat(result.data));

            setTotal(result.total);

            console.log('[usePhotos] Photos result', { result, error, canceled });
        };

        getPhotos();

        return () => { canceled = true; }

    }, [ offset, limit ]);


    return {
        photos,
        setPhotos,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.trunc(offset / limit) + 1,
        isLoading: isLoading,
        getNextPage: () => setOffset(offset + limit)
    }
}

type UsePhotosParams = {
    limit: number;
}