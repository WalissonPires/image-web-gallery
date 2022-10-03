
# Galeria de imagens da Web

O aplicativo permite você procurar por imagens na internet e criar uma galeria sem ter que salvar as imagens na sua máquina.

## Objetivo

O Objetivo do projeto foi estudar a aplicação de padrões de projetos em aplicações electron.

## Estrutura de pastas

Como no electron existe uma separação de processo de renderização e processo principal a aplicação foi separada em frontend (Pasta `src/renderer`, processo de renderização) e backend (Pasta `src/main`, processo principal).

O frontend e backend devem-se manter independentes um do outro. Sem acesso direto em si.

*Obs.: Essa regra foi quebrada somente para compartilhar os tipos dos objetivos que são passados entre o processo de renderização e principal. Para evitar duplicação de código (DRY).*

O código que pode ser compartilhado entre frontend e backend está na pasta **src/common**.

## Estrutura de pastas do Frontend (src/renderer)
No "frontend" foi usado a lib. react para construção da interface.

- **components**: Componentes React
- **hooks**: Hooks compartilhados
- **main-client**: Classes de acesso ao processo principal
- **pages**: Componentes React que representam as páginas/telas da aplicação
- **utils**: Código compartilhado (No fronted somente)

## Estrutura de pastas do Backend (src/main)
O "backend" foi estruturado seguindo o padrão de projeto `Clean Architecture`.

- **config**: Arquivos de configuração
- **domain**: Core da aplição seguindo os conceitos do padrão `Clean Architecture`.
- **domain/common**: Abstração da intraestrutura
- **domain/entities**: Entidades da aplicação
- **domain/use-cases**: Casos de uso

## Desenvolvimento

Na executar a aplicação crie um arquivo `src/main/config/development.json` com o seguinte contéudo:

```json
{
    // Tokens para acessar o Google Search Engine
    "googleApi": {
        "cse": "TOKEN",
        "apiKey": "TOKEN"
    }
}
```
Execute o comando `npm start`.