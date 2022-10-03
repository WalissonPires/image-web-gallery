import { Photo } from "../../entities/photo";


export class AddPhotosInput {
    public constructor(public photos: Photo[]) {}
}

export class AddPhotosResult {
    public constructor(public photos: Photo[]) {}
}