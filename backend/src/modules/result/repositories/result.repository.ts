import { AppDataSource } from "../../../database/data.source";
import { Result } from "../entities/result.entity";

export const ResultRepository = AppDataSource.getRepository(Result).extend({
  async findById(id: number): Promise<Result | null> {
    return this.findOneBy({ id });
  },
});
