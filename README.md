# Projeto

STATIONS API - BACKEND CHALLENGE

# Apresentação: https://www.youtube.com/watch?v=UsFLzJfvbfY

### Sobre a API

Foi desenvolvido uma API para resolução do desafio proposto pela empresa Voltbras.

## Pré-requisitos e utilização da API

. Para baixar a API:
git clone https://github.com/LuAugusto/Nasa-Graphql-API.git

É necessário ter o Docker instalado para executar a aplicação

A aplicação utiliza um banco postgres que utiliza a porta 5432

É necessário autenticar na API e logo abaixo você vai encontrar como se autenticar e utilizar.
A autenticação não utiliza um mecanismo de Cache de token e nenhum Token JWT, pq é uma demonstração de como
poderiamos autenticar, mas a arquitetura permite facilmente a criação de modulos de autenticação
mais robustos.

linux:
sudo docker-compose up -d --build

http://localhost:4000

para executar os testes basta executar: npm rum test

## sobre o sistema

A API tem como proposito fornecer um sistema de gerenciamente de carregamento de veículos espaciais, para isso
contamos com o consumo de uma API externa que é fornecida pela NASA:
https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html

o uso da API é gratuito e tem como intuito resolver um desafio proposto pela empresa VoltBras e também adquirir novas experiências e melhorar o meu aprendizado para que eu possa me tornar um desenvolvedor melhor a cada dia
e desafio.

## Queries e Mutations disponiveis com exemplo de estrutura de dados:

A API utiliza o GraphQL com o Apollo server para fornecedor o gerenciamento de carregamento.

# Registrar um User

```
mutation Register($data: UserRegisterInputData!) {
  register(data: $data) {
    id,
    email,
  }
}


Data example:

{
  "data": {
    "email": "teste@gmail.com",
    "password": "123456"
  }
}
```

# Login de um User

```
mutation Login($data: UserLoginInputData!) {
  login(data: $data) {
    id,
    email,
    token
  }
}

Data example:

{
  "data": {
    "email": "lu2@gmail.com",
    "password": "123456"
  }
}
```

# Buscar planetas onde estações de carregamento podem ser implementadas ou que já possuem

```
query GetSuitableStations($token: String!) {
  getSuitableStations(token: $token) {
    id,
    name,
    mass,
    hasStation
  }
}


Data example:

{
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805"
}
```

# Instalar uma estação

```
mutation InstallStation($data: StationInput!, $token: String!) {
  installStation(data: $data, token: $token) {
    id,
    mass,
    name,
    hasStation
  }
}

Data example:

{
  "data": {
    "id": "cljk2n12m0003f5tyhdlfed7e"
  },
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805"
}
```

# Listar estações

```
query ListStations($token: String!) {
  listStations(token: $token) {
    id,
    planetId,
    suitablePlanets {
      id,
      name,
      mass,
    },
  }
}

Data example:
{
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805"
}
```

# Listar o histórico de alguma estação

```
query ListStationHistory($data: RechargelistByStationInput!, $token: String!) {
  listStationHistory(data: $data, token: $token) {
    id,
    stationId,
    userId,
    end,
    start,
    status,
    reservation
  }
}

Data example:

{
  "data": {
    "id": "cljk2nbau0096f5tycpbju0tk"
  },
  "token": "84309911-5afc-4215-96be-b79a4b677e55"
}
```

# Recarregar em uma estação:

```
mutation CreateRecharge($token: String!, $data: RechargeInput!) {
  createRecharge(token: $token, data: $data) {
    id,
    userId,
    start,
    end,
    stationId,
    status,
    reservation,
  }
}

Data example:

{
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805",
  "data": {
    "stationId": "cljk2nbau0096f5tycpbju0tk",
    "end":"2023-07-02 19:00:00",
    "userId": "cljk2mcwn0000f5tych9q8h33"
  }
}

```

# Criar uma reserva em uma estação:

```
mutation CreateRecharge($token: String!, $data: RechargeInput!) {
  createRecharge(token: $token, data: $data) {
    id,
    userId,
    start,
    end,
    stationId,
    status,
    reservation,
  }
}

Data example:

{
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805",
  "data": {
    "stationId": "cljk2nbau0096f5tycpbju0tk",
    "end":"2023-07-03 19:00:00",
    "start": "2023-07-03 18:00:00",
    "userId": "cljk2mcwn0000f5tych9q8h33"
  }
}

```

# Criar uma reserva em uma estação a partir de um reservationId:

```
mutation CreateRechargeByReservationId($token: String!, $data: RechargeByReservationIdInput!) {
  createRechargeByReservationId(token: $token, data: $data) {
    userId,
    start,
    end,
    stationId,
    status,
  }
}

Data example:

{
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805",
  "data": {
    "reservationId": "cljlkiu4v0001f55l7ein0oru"
  }
}

```

# Atualizar o status de alguma recharge

```
mutation UpdateRechargeStatus($data: RechargeByIdInput!, $token: String!) {
  updateRechargeStatus(data: $data, token: $token) {
    id,
    status
  }
}

Data example:
{
  "data": {
    "id": "cljkba0j60001f5tfpvhq8mcx",
    "status": "COMPLETED"
  },
  "token": "23d1da42-a8b8-4456-bda1-a69f0ea1a805"
}

```

## - Testes -> Como rodar os teste unitários

npm run test
