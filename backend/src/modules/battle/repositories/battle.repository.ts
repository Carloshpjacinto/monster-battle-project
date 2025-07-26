import { AppDataSource } from "../../../database/data.source";
import { Battle } from "../entities/battle.entity";

export const BattleArenaRepository = AppDataSource.getRepository(Battle).extend(
  {
    async findById(
      id: number,
      relations: string[] = []
    ): Promise<Battle | null> {
      return this.findOne({ where: { id: id }, relations });
    },
  }
);
