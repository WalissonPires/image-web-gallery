import { ServicesName, ServicesType } from "../../../infra/ioc/types";
import { IPhotoRepository } from "../../common/repositories/photos-repository";
import { UseCase } from "../use-case";
import { DeletePhotosInput, DeletePhotosResult } from "./delete-photos-types";


export type DeletePhotosOptions = Pick<ServicesType, ServicesName.photoRepository>;

export class DeletePhotos implements UseCase<DeletePhotosInput, DeletePhotosResult> {

    private readonly _photoRepository: IPhotoRepository;

    constructor({ photoRepository }: DeletePhotosOptions) {

        this._photoRepository = photoRepository;
    }

    public async execute(input: DeletePhotosInput): Promise<DeletePhotosResult> {

        await this._photoRepository.deletePhotos(input.photosId);
        return new DeletePhotosResult();
    }
}