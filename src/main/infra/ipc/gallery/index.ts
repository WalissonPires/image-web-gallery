import { MainListener } from "../main-listener";
import { ServiceProvider } from "../../ioc";
import { ServicesName } from "../../ioc/types";

import { GetPhotosInput } from "../../../domain/use-cases/gallery/get-photos-types";
import { SearchImagesInput } from "../../../domain/use-cases/gallery/search-images-type";
import { AddPhotosInput } from "../../../domain/use-cases/gallery/add-photos-type";
import { DeletePhotosInput } from "../../../domain/use-cases/gallery/delete-photos-types";


function registerIpcListeners() {

    MainListener.handle('gallery.searchImages', async (input: SearchImagesInput) => {

        const useCase = ServiceProvider.getService(ServicesName.searchImages);
        const result = await useCase.execute(input);
        return result;
    });

    MainListener.handle('gallery.addPhotos', async (input: AddPhotosInput) => {

        const useCase = ServiceProvider.getService(ServicesName.addPhotos);
        const result = await useCase.execute(input);
        return result;
    });

    MainListener.handle('gallery.getPhotos', async (input: GetPhotosInput) => {

        const useCase = ServiceProvider.getService(ServicesName.getPhotos);
        const result = await useCase.execute(input);
        return result;
    });

    MainListener.handle('gallery.deletePhotos', async (input: DeletePhotosInput) => {

        const useCase = ServiceProvider.getService(ServicesName.deletePhotos);
        const result = await useCase.execute(input);
        return result;
    });
}


export default registerIpcListeners;