import UpdateBattleService from "../../modules/battle/services/updateBattle.service";
import {
  damageCalculation,
  Response,
} from "../../tools/damageCalculation.tool";
import { io } from "../http/http";
import { summaryPlayer } from "../../tools/sumarryPlayer.tool";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

io.on("connection", (socket) => {
  console.log("Novo jogador conectado:", socket.id);

  socket.on("start", async (battleId: number) => {
    const infoBattle = await summaryPlayer(battleId);
    const updateBattleService = new UpdateBattleService();
    let turnCount = 1;
    let calculo: Response;

    socket.join(`battle-${battleId}`);

    const playerGoesFirst =
      infoBattle.Player1.monster.speed >= infoBattle.Player2.monster.speed;
    infoBattle.Player1.attack_turn = playerGoesFirst;

    io.to(`battle-${battleId}`).emit(
      "log",
      playerGoesFirst ? `Você ataca primeiro` : `O adversário ataca primeiro`
    );

    await sleep(3000);
    if (!playerGoesFirst) {
      calculo = await damageCalculation(
        infoBattle.Player2.monster.attack,
        infoBattle.Player1.monster.defend,
        infoBattle.Player1.monster.hp
      );

      infoBattle.Player1.monster.hp = calculo.newHp;

      io.to(`battle-${battleId}`).emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      io.to(`battle-${battleId}`).emit(
        "log",
        `Adversário atacou causando ${calculo.danoCausado} de dano!`
      );

      if (infoBattle.Player1.monster.hp <= 0) {
        infoBattle.Player1.monster.hp = 0;
        await sleep(3000);
        io.to(`battle-${battleId}`).emit(
          "log",
          `Seu monstro foi derrotado! Vitória do adversário.`
        );

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Bot",
        });
        return;
      }

      infoBattle.Player1.attack_turn = true;
      io.to(`battle-${battleId}`).emit("your-turn");
    }

    socket.on("player-attack", async () => {
      if (!infoBattle.Player1.attack_turn) {
        socket.emit("log", "Não é seu turno.");
        return;
      }

      calculo = await damageCalculation(
        infoBattle.Player1.monster.attack,
        infoBattle.Player2.monster.defend,
        infoBattle.Player2.monster.hp
      );

      infoBattle.Player2.monster.hp = calculo.newHp;

      io.emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      io.emit("log", `Você atacou e causou ${calculo.danoCausado} de dano.`);

      if (infoBattle.Player2.monster.hp <= 0) {
        infoBattle.Player2.monster.hp = 0;
        io.emit("log", "Você venceu!");
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Player1",
        });

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        return;
      }

      ++turnCount;

      infoBattle.Player1.attack_turn = false;
      await sleep(3000);

      calculo = await damageCalculation(
        infoBattle.Player2.monster.attack,
        infoBattle.Player1.monster.defend,
        infoBattle.Player1.monster.hp
      );

      infoBattle.Player1.monster.hp = calculo.newHp;

      io.to(`battle-${battleId}`).emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      await sleep(1000);
      io.to(`battle-${battleId}`).emit(
        "log",
        `Adversário está atacando...`
      );

      await sleep(3000);
      io.to(`battle-${battleId}`).emit(
        "log",
        `Adversário atacou causando ${calculo.danoCausado} de dano.`
      );

      if (infoBattle.Player1.monster.hp <= 0) {
        infoBattle.Player1.monster.hp = 0;
        io.to(`battle-${battleId}`).emit(
          "log",
          "Seu monstro foi derrotado! Vitória do adversário."
        );
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Bot",
        });

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        return;
      }

      io.to(`battle-${battleId}`).emit("your-turn");
      infoBattle.Player1.attack_turn = true;
      turnCount++;
    });

    socket.on("player-defend", async () => {
      io.to(`battle-${battleId}`).emit("log", `Seu monstro está defendendo...`);

      calculo = await damageCalculation(
        infoBattle.Player2.monster.attack,
        infoBattle.Player1.monster.defend,
        infoBattle.Player1.monster.hp
      );

      const calculoDefend =
        calculo.danoCausado - 10 < 0 ? 0 : calculo.danoCausado - 10;

      infoBattle.Player1.monster.hp =
        infoBattle.Player1.monster.hp - calculoDefend;

      await sleep(4000);
      io.to(`battle-${battleId}`).emit(
        "log",
        `Seu monstro defendeu ao ataque o dano foi reduzido para ${
          calculo.danoCausado - 10 < 0 ? 0 : calculo.danoCausado - 10
        }`
      );

      io.to(`battle-${battleId}`).emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      if (infoBattle.Player1.monster.hp <= 0) {
        infoBattle.Player1.monster.hp = 0;
        await sleep(3000);
        io.to(`battle-${battleId}`).emit(
          "log",
          `Seu monstro foi derrotado! Vitória do adversário.`
        );

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Bot",
        });
        return;
      }

      ++turnCount;

      io.to(`battle-${battleId}`).emit("your-turn");
    });

    socket.on("player-attack-special", async () => {
      io.to(`battle-${battleId}`).emit(
        "log",
        `Seu monstro está usando o especial...`
      );

      calculo = await damageCalculation(
        infoBattle.Player1.monster.attack,
        infoBattle.Player2.monster.defend,
        infoBattle.Player2.monster.hp
      );

      const calculoAttackSpecial = calculo.danoCausado + 5;

      infoBattle.Player2.monster.hp =
        infoBattle.Player2.monster.hp - calculoAttackSpecial;

      await sleep(4000);
      io.to(`battle-${battleId}`).emit(
        "log",
        `Monstro adversario sofreu ${calculoAttackSpecial} de dano`
      );

      io.to(`battle-${battleId}`).emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      if (infoBattle.Player2.monster.hp <= 0) {
        infoBattle.Player2.monster.hp = 0;
        await sleep(3000);
        io.to(`battle-${battleId}`).emit(
          "log",
          `Monstro adversario foi derrotado! Você venceu.`
        );

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Player1",
        });
        return;
      }

      await sleep(3000);

      io.to(`battle-${battleId}`).emit("log", `Adversário está atacando...`);

      calculo = await damageCalculation(
        infoBattle.Player2.monster.attack,
        infoBattle.Player1.monster.defend,
        infoBattle.Player1.monster.hp
      );

      infoBattle.Player1.monster.hp = calculo.newHp;

      io.to(`battle-${battleId}`).emit("update-hp", {
        playerHP: infoBattle.Player1.monster.hp,
        botHP: infoBattle.Player2.monster.hp,
      });

      await sleep(3000);
      io.to(`battle-${battleId}`).emit(
        "log",
        `Adversário atacou causando ${calculo.danoCausado} de dano.`
      );

      if (infoBattle.Player1.monster.hp <= 0) {
        infoBattle.Player1.monster.hp = 0;
        await sleep(3000);
        io.to(`battle-${battleId}`).emit(
          "log",
          `Seu monstro foi derrotado! Vitória do adversário.`
        );

        io.to(`battle-${battleId}`).emit("update-hp", {
          playerHP: infoBattle.Player1.monster.hp,
          botHP: infoBattle.Player2.monster.hp,
        });
        await updateBattleService.execute(battleId, {
          turn_counter: turnCount,
          player_wins: "Bot",
        });
        return;
      }

      ++turnCount;

      io.to(`battle-${battleId}`).emit("your-turn");
    });

    socket.on("forfeit", async () => {
      io.to(`battle-${battleId}`).emit(
        "log",
        `Player saiu do jogo. Vitoria do Adversário`
      );
      await updateBattleService.execute(battleId, {
        turn_counter: turnCount,
        player_wins: "Bot",
      });

      socket.disconnect();
    });
  });
});
