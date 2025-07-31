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
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

### Testes:
<div>
  v<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" width="45" height="45" style="margin-right: 50px;"/>
</div>

## 📁 Arquitetura
A arquitetura segue o padrão modular com separação por camadas (controllers, services, repositories), respeitando os princípios SOLID e foco em escalabilidade. A comunicação entre frontend e backend é feita via WebSocket (Socket.IO) e HTTP REST usando axios.

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
    
## 🚪 Portas e Interfaces

#### Frontend: http://localhost:5173

##### API REST: http://localhost:3000

## 🔧 Possíveis Melhorias

Sistema de autenticação e ranking

Lógica mais complexa de AI para o bot

Balanceamento de monstros

Testes e2e completos

Expansão para múltiplos jogadores
