import React from "react";
import { Check, Eye, X } from "react-feather";
import { useNavigate } from "react-router-dom";

import { useSearchImages } from "./hooks/use-search-images";
import { useViewer } from "../../hooks/use-viewer";
import { LoadButtonWrapper } from "./styles";

import { Container } from "../../components/Layout/Container";
import { Header } from "../../components/Layout/Header";
import { Body } from "../../components/Layout/Body";
import { EmptyContent } from "../../components/Layout/EmptyContent";

import { IconButton } from "../../components/IconButton";
import { PhotoData, Photos } from "../../components/Photos";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import { AppError } from "../../../common/errors/app-error";
import { Viewer } from "../../components/Viewer";
import { Spinner } from "../../components/Spinner";

import { Notify } from "../../utils/notify";
import { GalleryClient } from "../../main-client/gallery";
import { Photo } from "../../../main/domain/entities/photo";
import { AddPhotosInput } from "../../../main/domain/use-cases/gallery/add-photos-type";


export const Search = () => {

    const navigate = useNavigate();

    const { photos, isLoading, searchTerm, setSearchTerm, getNextPage } = useSearchImages();

    const { handleShowViewer, handleCloseViewer, handlePreviousPhoto, handleNextPhoto, closeViewer, currentPhotoId } = useViewer({
        photos: photos,
        onLastPhotoViewed: () => {

            closeViewer();
            getNextPage();
        }
    });


    const handleAddPhotoToGalley = async (photo: PhotoData) => {

        try {
            const newPhoto = new Photo(photo.id);
            newPhoto.name = photo.name;
            newPhoto.imageUrl = photo.imageUrl;

            await new GalleryClient().addPhotos(new AddPhotosInput([ newPhoto ]));

            Notify.success('Image adicionar a galeria');
        }
        catch(error) {
            const { message } = AppError.parse(error);
            Notify.error(message);
        }
    };

    const renderePhotoActions = (photo: PhotoData) => {

        return (
            <IconButton onClick={() => handleAddPhotoToGalley(photo) } title="Adicionar para galeria" slim><Check style={{ color: 'var(--green)' }} /></IconButton>
        );
    };


    return (
        <Container>
            <Header>
                <Header.LeftCommon />
                <Header.Center>
                    <Wrapper horizontalCenter verticalCenter w100 style={{ padding: '0 20px' }}>
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} autoFocus placeholder="Que imagem você está procurando?" border />
                    </Wrapper>
                </Header.Center>
                <Header.Right>
                    <IconButton onClick={() => navigate(-1)} slim title="Fechar pesquisa"><X /></IconButton>
                </Header.Right>
            </Header>
            <Body>
                { currentPhotoId && <Viewer photos={photos} currentPhotoId={currentPhotoId} onCloseClick={handleCloseViewer} onPreviousClick={handlePreviousPhoto} onNextClick={handleNextPhoto} />}
                { photos.length > 0 &&
                <Photos photos={photos}
                    onItemlick={photo => handleShowViewer(photo.id)}
                    renderActions={renderePhotoActions} />}
                <LoadButtonWrapper>
                    { !isLoading && photos.length > 0 && <IconButton onClick={() => getNextPage()}><Eye style={{ marginRight: "5px" }} /> Carreger mais</IconButton>}
                    { isLoading && <Spinner /> }
                </LoadButtonWrapper>
                { !isLoading && photos.length === 0 && <EmptyContent>Encontre na web imagens do tema que você procura e salve na sua galeria.</EmptyContent>}
            </Body>
        </Container>
    );
}