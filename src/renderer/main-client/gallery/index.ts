import { MainClientBase } from "../main-client-base";
import { GetPhotosInput, GetPhotosResult } from "../../../main/domain/use-cases/gallery/get-photos-types";
import { SearchImagesInput, SearchImagesResult } from "../../../main/domain/use-cases/gallery/search-images-type";
import { AddPhotosInput, AddPhotosResult } from "../../../main/domain/use-cases/gallery/add-photos-type";
import { DeletePhotosInput, DeletePhotosResult } from "../../../main/domain/use-cases/gallery/delete-photos-types";


export class GalleryClient extends MainClientBase {

    public async searchIamges(input: SearchImagesInput) {

        const result = await this._sender.sendRequest<SearchImagesInput, SearchImagesResult>('gallery.searchImages', input);
        return result;
    }

    public async addPhotos(input: AddPhotosInput): Promise<AddPhotosResult> {

        const result = await this._sender.sendRequest<AddPhotosInput, AddPhotosResult>('gallery.addPhotos', input);
        return result;
    }

    public async getPhotos(input: GetPhotosInput): Promise<GetPhotosResult> {

        const result = await this._sender.sendRequest<GetPhotosInput, GetPhotosResult>('gallery.getPhotos', input);
        return result;
    }

    public async deletePhotos(input: DeletePhotosInput): Promise<DeletePhotosResult> {

        const result = await this._sender.sendRequest<DeletePhotosInput, DeletePhotosResult>('gallery.deletePhotos', input);
        return result;
    }
}