import React from "react";
import styled from "styled-components";

export const Input = ({ border, icon, ...props }: InputProps) => {

    return (
        <Container border={border}>
            <InputStyled {...props} />
            <IconWrapper>
                {icon}
            </IconWrapper>
        </Container>
    )
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    border?: boolean;
    icon?: React.ReactNode;
};

const Container = styled.div<{ border?: boolean; }>`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: #fff;
    color: #444;
    border: none;
    width: 100%;
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

const InputStyled = styled.input`
    background-color: transparent;
    color: #444;
    border: none;
    width: 100%;
    padding: 10px;
    outline: none;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
`;