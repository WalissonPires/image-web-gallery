import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, RefreshCcw, Search, Square, Trash2, X } from "react-feather";

import { Container } from "../../components/Layout/Container";
import { Header } from "../../components/Layout/Header";
import { Body } from "../../components/Layout/Body";

import { usePhotos } from "./hooks/use-photos";
import { useViewer } from "../../hooks/use-viewer";
import { LoadButtonWrapper } from "./styles";

import { Input } from "../../components/Input";
import { IconButton } from "../../components/IconButton";
import { PhotoData, Photos } from "../../components/Photos";
import { Viewer } from "../../components/Viewer";
import { SelectionBar } from "../../components/SelectionBar";
import { Spinner } from "../../components/Spinner";
import { EmptyContent, EmptyContentMessage, EmptyContentTitle } from "../../components/Layout/EmptyContent";
import { useConfirmModal } from "../../components/ConfirmModal/hooks/use-confirm-modal";

import { PagesUrls } from "../pages-urls";
import { Notify } from "../../utils/notify";
import { TryPromise } from "../../../common/promises/try-promise";
import { Photo } from "../../../main/domain/entities/photo";
import { GalleryClient } from "../../main-client/gallery";
import { DeletePhotosInput } from "../../../main/domain/use-cases/gallery/delete-photos-types";

export const Gallery = () => {

    const navigate = useNavigate();
    const { confirmModal, openConfirmModal } = useConfirmModal();

    const { photos, setPhotos, totalPages, currentPage, getNextPage, isLoading } = usePhotos({ limit: 20 });

    const { handleShowViewer, handleCloseViewer, handlePreviousPhoto, handleNextPhoto, closeViewer, currentPhotoId } = useViewer({
        photos: photos,
        onLastPhotoViewed: () => {

            closeViewer();
            getNextPage();
        }
    });


    const [ selectedsPhotosId, setSelectedsPhotosId ] = useState<Record<Photo["id"], true>>({});
    const itemsSelectedCount = Object.keys(selectedsPhotosId).length;
    const photos2: PhotoData[] = photos.map(photo => ({ ...photo, selected: selectedsPhotosId[photo.id] }));


    const handleGoToSeatch = () => navigate(PagesUrls.search);

    const handleDeleteSelectedsPhotos = () =>  {

        if (itemsSelectedCount === 0) {

            Notify.info('Selecione uma ou mais imagens');
            return;
        }

        const message = itemsSelectedCount > 1
            ? `Você deseja apagar ${itemsSelectedCount} imagens?`
            : `Você deseja apagar ${itemsSelectedCount} imagem?`;

        openConfirmModal(message, confimed => {

            if (!confimed)
                return;

            (async () => {

                const photosId = Object.keys(selectedsPhotosId);
                const client = new GalleryClient();
                const { error } = await TryPromise.try(client.deletePhotos(new DeletePhotosInput(photosId)));

                if (error) {

                    Notify.error(error.message);
                    return;
                }

                setPhotos(photos => photos.filter(photo => !photosId.includes(photo.id)));
                setSelectedsPhotosId({});

                Notify.success('Fotos deletadas');
            })();
        });
    }


    const renderePhotoActions = (photo: PhotoData) => {

        const handleClick = !photo.selected
            ? () => setSelectedsPhotosId(previous => ({ ...previous, [photo.id]: true }))
            : () => setSelectedsPhotosId(previous => {

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [photo.id]: _, ...rest } = previous;
                return rest;

            });

        return (
            <IconButton onClick={handleClick} title="Selecionar" slim>{ photo.selected ? <CheckSquare style={{ color: 'var(--blue)' }} /> : <Square/>}</IconButton>
        );
    };

    const renderSelecionBarActions = () => {

        const handleClose = () => setSelectedsPhotosId({});

        return (
            <>
                <IconButton onClick={handleDeleteSelectedsPhotos} title="Excluir itens selecionados" slim style={{ color: 'var(--red)' }}><Trash2 /></IconButton>
                <IconButton onClick={handleClose} title="Cancelar ação" slim style={{ marginLeft: '5px' }}><X /> Cancelar</IconButton>
            </>
        )
    }

    return (
        <Container>
            <Header>
                <Header.LeftCommon />
                <Header.CenterCommon />
                <Header.Right>
                    <div onClick={handleGoToSeatch}>
                        <Input
                            placeholder="Procurar imagem"
                            icon={ <Search />} />
                    </div>
                </Header.Right>
            </Header>
            <Body>
                {confirmModal}
                { itemsSelectedCount > 0 && <SelectionBar itensSelectedCount={itemsSelectedCount} renderActions={renderSelecionBarActions} />}
                { currentPhotoId && <Viewer photos={photos} currentPhotoId={currentPhotoId} onCloseClick={handleCloseViewer} onPreviousClick={handlePreviousPhoto} onNextClick={handleNextPhoto} />}
                <Photos photos={photos2}
                    renderActions={renderePhotoActions}
                    onItemlick={photo => handleShowViewer(photo.id)} />
                { currentPage < totalPages &&
                <LoadButtonWrapper>
                    { !isLoading && photos.length > 0 && <IconButton onClick={() => getNextPage()}><RefreshCcw style={{ marginRight: "5px" }} /> Carreger mais</IconButton> }
                    { isLoading && <Spinner /> }
                </LoadButtonWrapper> }
                { !isLoading && photos.length === 0 &&
                <EmptyContent>
                        <EmptyContentTitle>Pronto para começa?</EmptyContentTitle>
                        <EmptyContentMessage>
                            Clique no campo de pesquisa no topo da tela para procurar imagens na internet e criar sua galeria.
                        </EmptyContentMessage>
                </EmptyContent>}
            </Body>
        </Container>
    );
}