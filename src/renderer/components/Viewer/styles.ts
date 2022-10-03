import styled from "styled-components";


export const Container = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #222;
    color: #fff;
    display: flex;
`;

export const PhotoImgWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PhotoImg = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const BaseIconButton = styled.button`
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 3rem;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }
`;

export const PreviousButton = styled(BaseIconButton)``;

export const NextButton = styled(BaseIconButton)``;

export const CloseButton = styled(BaseIconButton)`
    position: absolute;
    z-index: 2;
    top: 0px;
    right: 0px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;