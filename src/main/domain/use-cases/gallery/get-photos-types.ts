import { Photo } from "../../entities/photo";

export class GetPhotosInput {

    constructor(public offset: number, public limit: number) {}
}

export class GetPhotosResult {

    constructor(public total: number, public data: Photo[]) {}
}