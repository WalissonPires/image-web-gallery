import styled from "styled-components";

export const Button = styled.button`
    border: none;
    background-color: #0077fe;
    color: #fff;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: opacity .4s ease;

    &:hover {
        opacity: 0.8;
    }
`;