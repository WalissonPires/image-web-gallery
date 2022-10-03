import { ServicesName, ServicesType } from "../../../infra/ioc/types";
import { IPhotoRepository, GetPhotosInput as RepoGetPhotosInput } from "../../common/repositories/photos-repository";
import { UseCase } from "../use-case";
import { GetPhotosInput, GetPhotosResult } from "./get-photos-types";


export type GetPhotosOptions = Pick<ServicesType, ServicesName.photoRepository>;

export class GetPhotos implements UseCase<GetPhotosInput, GetPhotosResult> {

    private readonly _photosRepository: IPhotoRepository;

    constructor({ photoRepository }: GetPhotosOptions) {
        this._photosRepository = photoRepository;
    }

    public async execute(input: GetPhotosInput): Promise<GetPhotosResult> {

        const result = await this._photosRepository.getPhotos(new RepoGetPhotosInput(input.offset, input.limit));
        return Promise.resolve(new GetPhotosResult(result.total, result.data));
    }

}