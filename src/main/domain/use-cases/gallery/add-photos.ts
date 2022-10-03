import { ServicesName, ServicesType } from "../../../infra/ioc/types";
import { IPhotoRepository } from "../../common/repositories/photos-repository";
import { UseCase } from "../use-case";
import { AddPhotosInput, AddPhotosResult } from "./add-photos-type";


export type AddPhotosOptions = Pick<ServicesType, ServicesName.photoRepository>;

export class AddPhotos implements UseCase<AddPhotosInput, AddPhotosResult> {

    private readonly _photoRepository: IPhotoRepository;

    public constructor({ photoRepository }: AddPhotosOptions) {

        this._photoRepository = photoRepository;
    }

    public async execute(input: AddPhotosInput): Promise<AddPhotosResult> {

        const photosAdded = await this._photoRepository.addPhotos(input.photos);
        return new AddPhotosResult(photosAdded);
    }
}