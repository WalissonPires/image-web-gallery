import { AppError } from "../../../../common/errors/app-error";
import { Photo } from "../../entities/photo";
import { DomainError } from "../../common/errors/domain-error";
import { ICryptoService } from "../../common/security/crypto-service";
import { UseCase } from "../use-case";
import { ImageInfo, ISearchImagesService, SearchImagesServiceInput } from "../../common/services/search-images-service";
import { SearchImagesInput, SearchImagesResult } from "./search-images-type";
import { ServicesName, ServicesType } from "../../../infra/ioc/types";


export type SearchImagesOptions = Pick<ServicesType, ServicesName.searchImagesService | ServicesName.cryptoService>;

export class SearchImages implements UseCase<SearchImagesInput, SearchImagesResult> {

    private readonly _searchService: ISearchImagesService;
    private readonly _crypto: ICryptoService;

    constructor({ searchImagesService, cryptoService }: SearchImagesOptions) {

        this._searchService = searchImagesService;
        this._crypto = cryptoService;
    }

    public async execute(input: SearchImagesInput): Promise<SearchImagesResult> {

        if (!input.searchTerm)
            throw new DomainError('O termo da pesquisa deve ser informado');

        const result = await this._searchService.searchImages(new SearchImagesServiceInput(input.searchTerm, input.offset, input.limit));
        if (!result)
            throw new AppError('Failed to search');

        const photos = result.data.map(item => this.mapIamge(item));

        return new SearchImagesResult(result.total, photos);
    }

    private mapIamge(image: ImageInfo) {

        const id = this._crypto.generateMD5(image.url);
        const photo = new Photo(id);
        photo.name = image.name;
        photo.imageUrl = image.url;

        return photo;
    }
}