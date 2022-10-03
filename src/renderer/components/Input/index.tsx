import styled from "styled-components";



export const Input = styled.input<{ border?: boolean; }>`
    background-color: #fff;
    color: #444;
    border: none;
    width: 100%;
    padding: 10px;
    outline: none;
    transition: border-color .4s ease-in;

    ${({ border }) => border ? `
        border: 1px solid #ddd;
        border-radius: 3px;
    `: `
        border-bottom: 1px solid #ddd;
    `}


    &:hover,
    &:focus {
        border-color: #0077fe;
    }
`;