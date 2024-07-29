# Lista Telefônica

Este projeto é um simples site de lista telefônica que carrega dados de um arquivo XML e permite filtrar a pesquisa por gerência, área ou nome. A lista é exibida em uma tabela que é ordenada por gerência, área e nome.

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML do site, incluindo o campo de busca e a tabela onde os dados são exibidos.
- `assets/`
  - `css/`
    - `styles.css`: Contém o CSS para estilizar a página, tornando-a visualmente agradável e fácil de usar.
  - `js/`
    - `script.js`: Contém o JavaScript que carrega os dados do arquivo XML, preenche a tabela e implementa a funcionalidade de busca e filtragem.
  - `xml/`
    - `data.xml`: Contém os dados da lista telefônica em formato XML.

## Funcionalidades

1. **Carregamento de Dados**: Os dados da lista telefônica são carregados a partir de um arquivo XML.
2. **Ordenação**: Os dados são ordenados por gerência, área e nome.
3. **Busca**: O usuário pode buscar por gerência, área ou nome. A busca prioriza correspondências exatas antes de mostrar correspondências parciais.

## Como Usar

1. **Preparação**:
    - Coloque os arquivos nas pastas correspondentes (`index.html` fora da pasta `assets`, e os arquivos `styles.css`, `script.js`, e `data.xml` nas pastas `assets/css`, `assets/js`, e `assets/xml`, respectivamente).

2. **Abrir o Projeto**:
    - Abra o arquivo `index.html` em um navegador web.

3. **Pesquisar**:
    - Use o campo de busca para filtrar a tabela por gerência, área ou nome. As correspondências exatas serão priorizadas.