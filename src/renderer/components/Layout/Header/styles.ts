import styled from "styled-components";

export const Container = styled.div`
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
`;

export const Left = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Center = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
`;

export const Navigation = styled.ul`
    display: flex;
    flex-direction: row;
`;

export const NativationItem = styled.li<{ active?: boolean }>`
    color: ${props => props.active ? '#5b8cc1': '#666'};
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    border-bottom: 3px solid ${props => props.active ? '#5b8cc1' : 'transparent'};
    transition: border .4s ease, background-color .4s ease;

    &:hover {
        background-color: #f3f3f3;
        border-bottom-color: ${props => props.active ? '#5b8cc1' : '#666'};
    }
`;