# 🧩 Batalha de Monstros - API + Frontend Integrado

### Sistema completo para batalhas interativas entre monstros controlados por jogadores ou bots. O projeto é um monolito que integra API RESTful com WebSocket e interface gráfica com React.

## 🚀 Tecnologias Utilizadas
### Backend:

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

### Frontend:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

### Testes:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

## 📁 Arquitetura

#### A arquitetura do projeto é monolítica, com o backend seguindo o padrão modular e separação por camadas (controllers, services, repositories), respeitando os princípios SOLID e com foco em escalabilidade. A comunicação entre o frontend e o backend é realizada via WebSocket (Socket.IO) e HTTP REST, utilizando Axios.

## ⚔️ Funcionalidades Principais
#### Seleção de monstros para jogadores e bots

#### Sistema de turnos com ataques normais e especiais

#### Cálculo de dano com lógica de defesa e cooldown

#### Logs de batalha em tempo real

#### Atualização em tempo real via WebSocket

#### Finalização da batalha por derrota ou desistência

#### Frontend interativo.

#### Controle visual de turnos, cooldowns e HP

## 📡 Principais Endpoints e Eventos

### 🔁 Eventos Socket.IO

#### start: Inicia a batalha entre dois monstros

#### attack: Realiza um ataque normal

#### special: Realiza um ataque especial

#### forfeit: Finaliza a batalha por desistência

#### your-turn: Informa quem deve jogar

#### log: Envia logs de batalha

#### update-hp: Atualiza os HPs em tempo real

#### battle-ended: Evento de fim de partida

### 📨 Endpoints REST (se aplicável)
#### GET /monsters: Lista todos os monstros disponíveis

#### POST /battle: Cria uma nova instância de batalha

## ⚙️ Instalação e Execução

### 1. Clone o repositório
#### bash

    git clone https://github.com/Carloshpjacinto/monster-battle-monolith.git
    
### 2. Instale as dependências
#### bash

    npm install
    
### 3. Configure as variáveis de ambiente

#### Use o arquivo .env.example como base para criar um .env.

## 🧪 Testes
#### bash

    npm run test:cov

#### Cadastro de monstros: http://localhost:3000/monster

#### Caso queira adicionar os monstros de uma vez só (SQL):

    INSERT INTO monsters (name, hp, attack, defend, speed) VALUES
    ('Bulbasaur', 45, 49, 49, 45),
    ('Charmander', 39, 52, 43, 65),
    ('Squirtle', 44, 48, 65, 43),
    ('Pikachu', 35, 55, 40, 90),
    ('Jigglypuff', 115, 45, 20, 20),
    ('Meowth', 40, 45, 35, 90),
    ('Psyduck', 50, 52, 48, 55),
    ('Machop', 70, 80, 50, 35),
    ('Geodude', 40, 80, 100, 20),
    ('Eevee', 55, 55, 50, 55),
    ('Snorlax', 160, 110, 65, 30),
    ('Gengar', 60, 65, 60, 110),
    ('Onix', 35, 45, 160, 70),
    ('Dragonite', 91, 134, 95, 80),
    ('Alakazam', 55, 50, 45, 120),
    ('Gyarados', 95, 125, 79, 81),
    ('Magikarp', 20, 10, 55, 80),
    ('Mewtwo', 106, 110, 90, 130),
    ('Vulpix', 38, 41, 40, 65),
    ('Bellsprout', 50, 75, 35, 40),
    ('Abra', 25, 20, 15, 90),
    ('Cubone', 50, 50, 95, 35),
    ('Slowpoke', 90, 65, 65, 15),
    ('Scyther', 70, 110, 80, 105),
    ('Ditto', 48, 48, 48, 48);

#### Cadastro de arenas: http://localhost:3000/arena

#### Caso queira adicionar varias arenas de uma vez só (SQL):

    INSERT INTO arenas (name, max_players) VALUES
    ('Floresta Encantada', 2),
    ('Montanha Rochosa', 2),
    ('Arena de Areia', 2),
    ('Vale Gelado', 2),
    ('Caverna Sombria', 2),
    ('Deserto Ardente', 2),
    ('Templo Antigo', 2),
    ('Lago Cristalino', 2),
    ('Planície Ventosa', 2),
    ('Fortaleza Abandonada', 2);
    
## 🚪 Portas e Interfaces

#### Frontend: http://localhost:5173

##### API REST: http://localhost:3000

## 🔧 Possíveis Melhorias

Sistema de autenticação e ranking

Lógica mais complexa de AI para o bot

Balanceamento de monstros

Testes e2e completos

Expansão para múltiplos jogadores
