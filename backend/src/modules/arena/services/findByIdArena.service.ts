import "reflect-metadata";
import { Arena } from "../entities/arena.entity";
import { ArenaRepository } from "../repositories/arena.repository";

export default class FindByIdArenaService {
  async execute(id: number): Promise<Arena | null> {
    const arena = await ArenaRepository.findById(id);

    return arena;
  }
}
