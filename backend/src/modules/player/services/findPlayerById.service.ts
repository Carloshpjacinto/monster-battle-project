import "reflect-metadata";
import { Player } from "../entities/player.entity";
import { PlayerRepository } from "../repositories/player.repository";

export default class FindByIdPlayerService {
  async execute(id: number): Promise<Player | null> {
    const player = await PlayerRepository.findById(id);

    return player;
  }
}
