import { useEffect, useState } from "react";
import { Photo } from "../../../../main/domain/entities/photo";
import { SearchImagesInput } from "../../../../main/domain/use-cases/gallery/search-images-type";
import { GalleryClient } from "../../../main-client/gallery";


export const useSearchImages = () => {

    const [ photos, setPhotos ] = useState<Photo[]>([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ offset, setOffset ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const limit = 10;

    useEffect(() => {

        if (!searchTerm) {

            setPhotos([]);
            return;
        }

        const searchImages = async() => {

            try {
                setIsLoading(true);
                const result = await new GalleryClient().searchIamges(new SearchImagesInput(searchTerm, offset, limit));

                if (offset === 0)
                    setPhotos(result.data);
                else
                    setPhotos(previous => previous.concat(result.data));
            }
            catch (error) {
                setPhotos([]);
            }
            finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => searchImages(), offset > 0 ? 0 : 500);

        return () => clearTimeout(timeoutId);

    }, [ searchTerm, offset]);


    return {
        photos,
        isLoading,
        searchTerm,
        setSearchTerm: (term: string) => {

            setSearchTerm(term);
            setOffset(0);
        },
        getNextPage: () => setOffset(offset + limit)
    }
}