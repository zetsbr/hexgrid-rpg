# Hexgrid RPG Backend

Backend da aplicação Hexgrid RPG, responsável por gerenciar o mundo, células, notas e tokens do jogo para acompanhamento de viagem e distancia percorrida, baseado no sistema de viagem de Fabula Ultima.

**Author:** ZETSBR (jvaporto@gmail.com)

---

## Índice

- [Descrição](#descrição)
- [Dependências](#dependências)
- [Instalação](#instalação)
- [Rodando a API](#rodando-a-api)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
  - [Mundo](#mundo)
  - [Notas](#notas)
  - [Tokens](#tokens)
- [Testes](#testes)

---

## Descrição

O backend é implementado em **FastAPI**, usando **Pydantic** para validação de dados e persistência em arquivo JSON. Ele gerencia:

- Um **mundo** com dimensões definidas por `max_x` e `max_y`.
- **Células** que podem conter **notas**.
- **Tokens** que podem ser posicionados dentro da grid ou em uma bandeja separada.

---

## Dependências

Para rodar o backend do projeto, instale as seguintes dependências:

```bash
pip install fastapi           # Framework principal da API
pip install uvicorn           # Servidor ASGI para rodar a API
pip install pydantic          # Validação e modelagem de dados
pip install anyio             # Necessário para operações assíncronas do FastAPI
