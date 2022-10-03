

export interface ISearchImagesService {

    searchImages(input: SearchImagesServiceInput): Promise<SearchImagesServiceResult>;
}

export class SearchImagesServiceInput {

    constructor(public seachTerm: string, public offset: number, public limit: number) {}
}

export class SearchImagesServiceResult {

    constructor(public total: number, public data: ImageInfo[]) {}
}

export class ImageInfo {

    constructor(public name: string, public url: string) {}
}