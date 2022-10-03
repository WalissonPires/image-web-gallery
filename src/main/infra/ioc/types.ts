import { IPhotoRepository } from "../../domain/common/repositories/photos-repository"

import { ICryptoService } from "../../domain/common/security/crypto-service";
import { ISearchImagesService } from "../../domain/common/services/search-images-service";

import { ConfigProvider } from "../../config/config-provider";

import { SearchImages } from "../../domain/use-cases/gallery/search-images";
import { GetPhotos } from "../../domain/use-cases/gallery/get-photos";
import { AddPhotos } from "../../domain/use-cases/gallery/add-photos";
import { DeletePhotos } from "../../domain/use-cases/gallery/delete-photos";


export enum ServicesName {
    photoRepository = "photoRepository",

    cryptoService = "cryptoService",
    configProvider = "configProvider",
    searchImagesService = "searchImagesService",

    searchImages = "searchImages",
    getPhotos = "getPhotos",
    addPhotos = "addPhotos",
    deletePhotos = "deletePhotos",
}

export type ServicesType = {
    [ServicesName.photoRepository]: IPhotoRepository;

    [ServicesName.cryptoService]: ICryptoService;
    [ServicesName.configProvider]: ConfigProvider;
    [ServicesName.searchImagesService]: ISearchImagesService;

    [ServicesName.searchImages]: SearchImages;
    [ServicesName.getPhotos]: GetPhotos;
    [ServicesName.addPhotos]: AddPhotos;
    [ServicesName.deletePhotos]: DeletePhotos;
}