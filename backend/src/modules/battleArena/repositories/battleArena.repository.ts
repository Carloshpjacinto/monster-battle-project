import { AppDataSource } from "../../../database/data.source";
import { BattleArena } from "../entities/battleArena.entity";

export const BattleArenaRepository = AppDataSource.getRepository(BattleArena).extend({});
