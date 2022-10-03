import styled from "styled-components";


export const IconButton = styled.button<{ slim?: boolean; }>`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border: ${({ slim }) => slim ? 'none' : '1px solid #ddd'};
    background-color: transparent;
    padding: ${({ slim }) => slim ? '5px' : '10px 20px'};
    border-radius: 3px;
    cursor: pointer;

    transition: background-color .4s ease;

    &:hover {
        ${props => props.slim ? '': 'background-color: #eee;'}
    }

    & > :nth-child(2) {
        margin-left: 5px;
        color: currentColor;
    }
`;