import React from "react";

import { Container, ContentLeft, ContentRight } from "./styles";


export const SelectionBar = ({ itensSelectedCount, renderActions }: SelectionBarProps) => {

    const selectionCountMsg = itensSelectedCount <= 0
        ? 'Nenhum item selecionado'
        : itensSelectedCount === 1
        ? '1 item selecionado'
        : itensSelectedCount + ' itens selecionados';

    return (
        <Container>
            <ContentLeft>
                <span>{selectionCountMsg}</span>
            </ContentLeft>
            <ContentRight>
                {renderActions()}
            </ContentRight>
        </Container>
    )
}


export type SelectionBarProps = {
    itensSelectedCount: number
    renderActions: () => React.ReactNode;
}