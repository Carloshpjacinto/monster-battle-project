import "reflect-metadata";
import { Arena } from "../entities/arena.entity"; 
import { ArenaRepository } from "../repositories/arena.repository"; 

export default class FindAllArenaService {
  async execute(): Promise<Arena[] | null> {
    const arenas = await ArenaRepository.find();

    return arenas;
  }
}
