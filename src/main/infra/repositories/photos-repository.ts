import { Photo } from "../../domain/entities/photo";
import { GetPhotosInput, GetPhotosResult, IPhotoRepository } from "../../domain/common/repositories/photos-repository";


export class PhotosRepository implements IPhotoRepository {

    public addPhotos(photos: Photo[]): Promise<Photo[]> {

        photos.forEach(photo => PhotosRepository._data.push(photo));
        return Promise.resolve(photos);
    }

    public getPhotos(input: GetPhotosInput): Promise<GetPhotosResult> {

        const result: Photo[] = [];
        let count = 0;

        for(let i = input.offset; count < input.limit && i < PhotosRepository._data.length; i++) {
            result.push(PhotosRepository._data[i]);
            count++;
        }

        return Promise.resolve(new GetPhotosResult(PhotosRepository._data.length, result));
    }

    public deletePhotos(photosId: string[]): Promise<void> {

        for(const photoId of photosId) {

            const photoIndex = PhotosRepository._data.findIndex(x => x.id === photoId);
            if (photoIndex >= 0)
                PhotosRepository._data.splice(photoIndex, 1);
        }

        return Promise.resolve();
    }



    private static _data: Photo[] =  [{
        id: '1',
        name: 'Rin Tosaka',
        imageUrl: 'https://static.anime21.blog.br/2014/11/Fate-Stay-Night-Unlimited-Blade-Works-5.mkv_20141111_024758.991-1200x900-cropped.png'
    }, {
        id: '2',
        name: 'Saber',
        imageUrl: 'https://www.itl.cat/pngfile/big/308-3085801_fate-saber.png'
    }, {
        id: '3',
        name: 'Saber 2',
        imageUrl: 'https://i.pinimg.com/originals/9d/56/5f/9d565f16b04f85366704c96c48405277.jpg'
    }, {
        id: '4',
        name: 'Fate',
        imageUrl: 'https://p4.wallpaperbetter.com/wallpaper/454/101/77/fate-series-fgo-fate-stay-night-fate-stay-night-heaven-s-feel-anime-girls-hd-wallpaper-preview.jpg'
    }, {
        id: '5',
        name: 'Saber 3',
        imageUrl: 'https://wallpaperaccess.com/full/8051826.jpg'
    }];
}