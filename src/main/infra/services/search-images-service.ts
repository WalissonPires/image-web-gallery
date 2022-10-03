import { ImageInfo, ISearchImagesService, SearchImagesServiceInput, SearchImagesServiceResult } from "../../domain/common/services/search-images-service";
import GoogleImages from 'google-images';
import * as path from "path";
import { ServicesName, ServicesType } from "../ioc/types";
import { GoogleApiConfig } from "../../config/google-api-config";


export type SearchImagesServiceOptions = Pick<ServicesType, ServicesName.configProvider>;

export class SearchImagesService implements ISearchImagesService {

    private _config: GoogleApiConfig;

    constructor({ configProvider }: SearchImagesServiceOptions) {

        this._config = configProvider.getConfig(GoogleApiConfig.sectionName);
    }

    public async searchImages(input: SearchImagesServiceInput): Promise<SearchImagesServiceResult> {

        const page = input.offset; //Math.ceil(input.offset / input.limit) + 1;
        const client = new GoogleImages(this._config.cse, this._config.apiKey);
        const result: ImageItem[] = await client.search(input.seachTerm, { page });

        const data = result.map(item => new ImageInfo(path.basename(item.url), item.url));

        return new SearchImagesServiceResult(99999, data);
    }
}

type ImageItem = {
    "url": string,
    "type": string,
    "width":number,
    "height": number,
    "size": number,
    "thumbnail": {
        "url": string,
        "width": number,
        "height": number
    }
}