import styled from "styled-components";


export const Container = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 40px;
`;

export const ContentLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const ContentRight = ContentLeft;