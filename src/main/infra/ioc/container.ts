import { createContainer, asClass, Resolver, asFunction } from "awilix";
import { ServicesType } from "./types";

import { PhotosRepository } from "../repositories/photos-repository";

import { CryptoService } from "../security/crypto-service";
import { ConfigProvider } from "../../config/config-provider";
import { SearchImagesService } from "../services/search-images-service";

import { SearchImages } from "../../domain/use-cases/gallery/search-images";
import { GetPhotos } from "../../domain/use-cases/gallery/get-photos";
import { AddPhotos } from "../../domain/use-cases/gallery/add-photos";
import { DeletePhotos } from "../../domain/use-cases/gallery/delete-photos";
import { PrismaClientFactory } from "../database";

export const container = createContainer({ injectionMode: "PROXY" });

const services: Record<keyof ServicesType, Resolver<unknown>> = {
    prismaClient: asFunction(PrismaClientFactory.create).singleton(),
    photoRepository: asClass(PhotosRepository).transient(),

    cryptoService: asClass(CryptoService).transient(),
    configProvider: asClass(ConfigProvider).transient(),
    searchImagesService: asClass(SearchImagesService).transient(),

    searchImages: asClass(SearchImages).transient(),
    getPhotos: asClass(GetPhotos).transient(),
    addPhotos: asClass(AddPhotos).transient(),
    deletePhotos: asClass(DeletePhotos).transient()
};

container.register(services);