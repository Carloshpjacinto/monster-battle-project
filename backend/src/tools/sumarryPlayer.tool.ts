import FindBattleByIdService from "../modules/battle/services/findBattleById.service";
import { Player } from "../types/summaryPlayer";

export async function summaryPlayer(idBattle: number) {
  const findBattleByIdService = new FindBattleByIdService();
  const infoBattle = await findBattleByIdService.execute(idBattle);

  if (!infoBattle) throw new Error("Battle Id não encontrado");
  let summaryPlayer1: Player;

  let summaryPlayer2: Player;

  summaryPlayer1 = {
    name: infoBattle.player1.name,
    monster: {
      name: infoBattle.monster_player1.name,
      hp: infoBattle.monster_player1.hp,
      attack: infoBattle.monster_player1.attack,
      defend: infoBattle.monster_player1.defend,
      speed: infoBattle.monster_player1.speed,
    },
    attack_turn: false,
  };

  summaryPlayer2 = {
    name: infoBattle.player2.name,
    monster: {
      name: infoBattle.monster_player2.name,
      hp: infoBattle.monster_player2.hp,
      attack: infoBattle.monster_player2.attack,
      defend: infoBattle.monster_player2.defend,
      speed: infoBattle.monster_player2.speed,
    },
    attack_turn: false,
  };

  return {
    Player1: summaryPlayer1,
    Player2: summaryPlayer2,
  };
}
