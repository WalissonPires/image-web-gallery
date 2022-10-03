import { Photo } from "../../entities/photo";


export class SearchImagesInput {

    constructor(public searchTerm: string, public offset: number, public limit: number) {}
}

export class SearchImagesResult {

    constructor(public total: number, public data: Photo[]) {}
}