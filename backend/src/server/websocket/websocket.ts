import {
  damageCalculation,
  Response,
} from "../../tools/damageCalculation.tool";
import { io } from "../http/http";
import { summaryPlayer } from "./sumarryPlayer";

const sleep = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));

io.on("connection", async (socket) => {
  socket.on("Start", async (data) => {
    const infoBattle = await summaryPlayer(data);
    let contadorTurn: number = 1;
    let calculte: Response;

    socket.emit("response-start-fight", "A batalha vai começar...");

    if (infoBattle.Player1.monster.speed > infoBattle.Player2.monster.speed) {
      infoBattle.Player1.attack_turn = true;

      await sleep(5000);
      socket.emit(
        "response-start-fight",
        `A velocidade do seu ${infoBattle.Player1.monster.name} é maior que a velocidade do ${infoBattle.Player2.monster.name} do adversario, por tanto o primeiro ataque é seu`
      );
    } else {
      await sleep(5000);
      socket.emit(
        "response-start-fight",
        `A velocidade do ${infoBattle.Player2.monster.name} do adversario é maior que a velocidade do seu ${infoBattle.Player1.monster.name}, por tanto o primeiro ataque é dele`
      );
      await sleep(5000);
      socket.emit("response-start-fight", "Adversario atacando...");

      calculte = await damageCalculation(
        infoBattle.Player2.monster.attack,
        infoBattle.Player1.monster.defend,
        infoBattle.Player1.monster.hp
      );

      infoBattle.Player1.monster.hp = calculte.newHp;

      await sleep(5000);
      socket.emit(
        "response-start-fight",
        `Monstro adversario causou ${calculte.danoCausado} de dano ao seu monstro`
      );

      infoBattle.Player1.attack_turn = true;

      if (infoBattle.Player1.monster.hp <= 0) {
        socket.emit(
          "response-start-fight",
          `Monstro adversario causou ${calculte.danoCausado} de dano ao seu monstro, o jogo terminou em um golpe, Vitoria do bot`
        );
        return 0;
      }
    }

    socket.on("attack", async () => {
      if (infoBattle.Player1.attack_turn == false) {
        socket.emit("cant-attack", "Você não pode atacar fora do seu turno");
      } else {
        if (infoBattle.Player2.monster.hp <= 0) {
          socket.emit(
            "cant-enemy-monster-without-life",
            "Monstro inimigo já foi derrotado"
          );
        } else {
          socket.emit("response-my-attack", "Atacando monstro adversario...");
          calculte = await damageCalculation(
            infoBattle.Player1.monster.attack,
            infoBattle.Player2.monster.defend,
            infoBattle.Player2.monster.hp
          );

          infoBattle.Player2.monster.hp = calculte.newHp;

          if (infoBattle.Player2.monster.hp <= 0) {
            socket.emit(
              "response-my-attack",
              `Seu monstro derrotou o monstro adversario o jogo terminou, Parabéns você ganhou`
            );
            return 0;
          } else {
            await sleep(5000);
            socket.emit(
              "response-my-attack",
              `O ataque do seu Monstro causou ${calculte.danoCausado} de dano ao monstro do adversario`
            );

            await sleep(5000);
            socket.emit(
              "response-my-attack",
              `O adversario está no seu turno...`
            );

            await sleep(5000);
            socket.emit("response-my-attack", `O adversario está atacando...`);

            calculte = await damageCalculation(
              infoBattle.Player2.monster.attack,
              infoBattle.Player1.monster.defend,
              infoBattle.Player1.monster.hp
            );

            infoBattle.Player1.monster.hp = calculte.newHp;

            infoBattle.Player1.attack_turn = false;
          }
        }
      }

      if (infoBattle.Player1.monster.hp <= 0) {
        socket.emit(
          "response-my-attack",
          `Seu monstro foi derrotado, o adversario ganhou o jogo, Vitoria do Bot`
        );
        return 0;
      } else {
        contadorTurn += 1;

        await sleep(5000);
        socket.emit(
          "response-my-attack",
          `Monstro adversario causou ${calculte.danoCausado} de dano ao seu monstro`,
          contadorTurn
        );

        infoBattle.Player1.attack_turn = true;
      }
    });

    socket.on("get-info-my-monster", () => {
      socket.emit("info-my-monster", infoBattle.Player1.monster);
    });

    socket.on("get-info-monster-adversary", () => {
      socket.emit("info-monster-adversary", infoBattle.Player2.monster);
    });
  });
});
