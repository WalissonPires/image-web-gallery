import { PrismaClient, Photo as PhotoDb } from "@prisma/client";
import { Photo } from "../../domain/entities/photo";
import { GetPhotosInput, GetPhotosResult, IPhotoRepository } from "../../domain/common/repositories/photos-repository";
import { ServicesName, ServicesType } from "../ioc/types";


export type PhotosRepositoryOptions = Pick<ServicesType, ServicesName.prismaClient>;

export class PhotosRepository implements IPhotoRepository {

    private readonly _prismaClient: PrismaClient;

    public constructor({ prismaClient }: PhotosRepositoryOptions) {

        this._prismaClient = prismaClient;
    }

    public async addPhotos(photos: Photo[]): Promise<Photo[]> {

        const photosDb = await this._prismaClient.$transaction(photos.map(photo => this._prismaClient.photo.create({
            data: {
                id: photo.id,
                name: photo.name,
                url: photo.imageUrl
            }
        })));

        return photosDb.map(photoDb => this.mapPhotoDb(photoDb));
    }

    public async getPhotos(input: GetPhotosInput): Promise<GetPhotosResult> {

        const count = await this._prismaClient.photo.count();

        const photosDb = await this._prismaClient.photo.findMany({
            skip: input.offset,
            take: input.limit,
            orderBy: {
                createAt: 'asc'
            }
        });

        return new GetPhotosResult(count, photosDb.map(photoDb => this.mapPhotoDb(photoDb)));
    }

    public async deletePhotos(photosId: string[]): Promise<void> {

        await this._prismaClient.photo.deleteMany({
            where: {
                id: {
                    in: photosId
                }
            }
        });
    }


    private mapPhotoDb(photoDb: PhotoDb): Photo {

        const photo: Photo = {
            id: photoDb.id,
            name: photoDb.name,
            imageUrl: photoDb.url
        };

        return photo;
    }
}