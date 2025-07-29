import "reflect-metadata";
import { UpdateBattleDto } from "../dto/update-battle.dto";
import { BattleArenaRepository } from "../repositories/battle.repository";

export default class UpdateBattleService {
  async execute(
    id: number,
    dataUpdate: UpdateBattleDto
  ): Promise<string | null> {
    const { turn_counter, player_wins } = dataUpdate;

    await BattleArenaRepository.update({ id }, { turn_counter, player_wins });

    return "Batalha atualizada";
  }
}
