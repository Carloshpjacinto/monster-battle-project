import "reflect-metadata";
import { BattleArenaRepository } from "../repositories/battle.repository";
import { Battle } from "../entities/battle.entity";

export default class FindBattleByIdService {
  async execute(id: number): Promise<Battle | null> {
    const battle = await BattleArenaRepository.findById(id, [
      "arena",
      "player1",
      "player2",
      "monster_player1",
      "monster_player2",
    ]);

    return battle;
  }
}
