import "reflect-metadata";
import { Arena } from "../entities/arena.entity";
import { ArenaRepository } from "../repositories/arena.repository"; 
import { CreateArenaDto } from "../dto/create-arena.dto";

export default class CreateArenaService {
  async execute(data: CreateArenaDto): Promise<Arena | string> {
    const NewArena = ArenaRepository.create(data);

    const arena = await ArenaRepository.save(NewArena);

    return arena;
  }
}
