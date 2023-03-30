# Texo - Senior Angular FrontEnd Test

This is a technical admission text for an opportunity at TEXO IT created from the following specifications:

### Especificação do Teste
Desenvolver uma interface para possibilitar a leitura da lista de indicados e vencedores
da categoria __Pior Filme__ do _Golden Raspberry Awards_.

A aplicação deverá ser composta por 2 views:

  * Dashboard; 
  * Lista de todos os filmes.

A página deve possuir um menu com links para as views.
Os dados serão obtidos através de uma [API](https://tools.texoit.com/backend-java/api/movies). O detalhamento pode ser obtido na
seção __Formato da API__ (não inclusa neste Readme). Deve-se também criar testes unitários e incluir um arquivo
readme com as instruções para rodar o projeto.

### Requisitos do sistema:
1. O dashboard deve ser criado conforme especificado pelo __anexo 1__ (não incluído neste Readme) e deverá ser composto por 4 painéis com os seguintes requisitos:
   * Mostrar em uma tabela os anos que tiveram mais de um vencedor;
   * Mostrar em uma tabela os três estúdios com mais vitórias
   * Mostrar em tabelas os produtores com maior e menor intervalo entre
   vitórias;
   * Exibir em tabela os vencedores de determinado ano selecionado através
   de um campo de busca.
2. A view que lista todos os filmes conforme especificado pelo __anexo 2__ (não incluído neste Readme). Deverá possuir paginação e conter ainda dois filtros:
   * Por ano;
   * Por vencedor.
3. Criar testes unitários de todas as funcionalidades.


### Requisitos não funcionais do sistema:
1. Responsividade mínima 768x1280;
2. Qualidade de código (legibilidade, lógica, indentação);
3. Boas práticas de implementação;
4. Documentação.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
