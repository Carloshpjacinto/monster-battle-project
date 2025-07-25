import { AppDataSource } from "../../../database/data.source";
import { Arena } from "../entities/arena.entity";

export const ArenaRepository = AppDataSource.getRepository(Arena).extend({
  async findById(id: number): Promise<Arena | null> {
    return this.findOneBy({ id });
  },
});
