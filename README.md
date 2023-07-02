# Projeto

STATIONS API - BACKEND CHALLENGE

### Sobre a API

Foi desenvolvido uma API para resolução do desafio proposto pela empresa Voltbras.

## Pré-requisitos e utilização da API

. Para baixar a API:
git clone https://github.com/LuAugusto/cronchallenge.git

. Arquivo .env:
É necessario criar no arquivo .env e definir:
DB_URL -> Url do banco mongoDB
Por questões de segurança a URL de acesso ao banco utilizado no desafio não esta presente no arquivo .env
sendo necessário criar no : https://www.mongodb.com/cloud/atlas/register
.O mongodb cria de forma automática o banco de dados e a collection caso não exista, o nome do banco
esta presente no arquivo .env, a única collection utilizada se chama 'products'

. Instalando recursos e libs:
npm i

. Iniciando a api:
npm run dev

Rota de health-check para validação de funcionamento da api:
http://localhost:3333/api/health-check

## sobre o sistema Cron

uma variavel chamada TIME_CRON definida no .env define o periodo do cron.
atualmente foi definido 20 minutos para rodar o cron, o cron é acionado automaticamente após
o servidor iniciar pelo Docker ou com o comando npm run dev.

o tempo de 20 minutos foi definido por questões de testes.

Lib utilizada: https://www.npmjs.com/package/node-cron
Cron Maker (Para criar schedules): http://www.cronmaker.com/;jsessionid=node01hb9tfy89j665fm5dhtsglbbi1066151.node0?0

## Utilizando projeto com Docker

Para utilizar o projeto com o docker, siga estas etapas:

Requisitos: Docker instalado

sudo docker-compose build
sudo docker-compose up

Porta do projeto: 3333

## Rotas disponiveis e documentação da API:

rota da documentação swagger: api/docs
Exemplo: http://localhost:3333/api/docs

## - Testes -> Como rodar os teste unitários

npm run test
