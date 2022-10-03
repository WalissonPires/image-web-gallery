import styled from "styled-components";


export const Container = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: auto;
`;

export const PhotoItem = styled.div<{ active?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    transition: border-color .2s ease-in;
    border: 2px solid ${({ active }) => active ? 'var(--blue)' : 'transparent'};
`;

export const PhotoImage = styled.div<{ imageUrl: string; }>`
    height: 25vw;
    width: 25vw;
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

export const PhotoInfo = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 25%;
    min-height: 100px;
    padding: 20px;
    color: #fff;
    background: linear-gradient(to top, black, transparent);
`;

export const PhotoTitle = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const PhotoActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;

    & svg {
        color: #fff;
    }
`;