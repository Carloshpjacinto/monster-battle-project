import { AppDataSource } from "../../../database/data.source";
import { Player } from "../entities/player.entity";

export const PlayerRepository = AppDataSource.getRepository(Player).extend({
  async findById(id: number): Promise<Player | null> {
    return this.findOneBy({ id });
  },
});
