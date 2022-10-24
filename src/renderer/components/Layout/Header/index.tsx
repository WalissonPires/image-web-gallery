import React from "react";
import { Center, Container, Left, Navigation, NativationItem, Right } from "./styles";

export const Header = ({ children }: HeaderProps) => {

    return (
        <Container>
           {children}
        </Container>
    );
}

export type HeaderProps = {
    children: React.ReactNode;
}

Header.Left = Left;
Header.Center = Center;
Header.Right = Right;

Header.LeftCommon = () => {

    return (
    <Left>
        {/* <small>wpFotos</small> */}
    </Left>);
}

Header.CenterCommon = () => {

    return (
        <Center>
            <Navigation>
                <NativationItem active>Fotos</NativationItem>
                {/* <NativationItem>Álbuns</NativationItem> */}
            </Navigation>
        </Center>
    );
}