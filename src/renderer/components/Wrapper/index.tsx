import styled from "styled-components";


export const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-direction: row;
    align-items: ${props => props.verticalCenter ? 'center' : 'auto'};
    justify-content: ${props => props.horizontalCenter ? 'center' : 'auto'};
    width: ${props => props.w100 ? '100%' : 'auto' };
`;


export type WrapperProps = {
    horizontalCenter?: boolean;
    verticalCenter?: boolean;
    w100?: boolean;
}