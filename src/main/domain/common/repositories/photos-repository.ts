import { Photo } from "../../entities/photo";


export interface IPhotoRepository {
    getPhotos(input: GetPhotosInput): Promise<GetPhotosResult>;
    addPhotos(photos: Photo[]): Promise<Photo[]>;
    deletePhotos(photosId: string[]): Promise<void>;
}

export class GetPhotosInput {

    constructor(public offset: number, public limit: number) {}
}

export class GetPhotosResult {

    constructor(public total: number, public data: Photo[]) {}
}