import { AppDataSource } from "../../../database/data.source";
import { Battle } from "../entities/battle.entity";

export const BattleArenaRepository = AppDataSource.getRepository(Battle).extend(
  {}
);
