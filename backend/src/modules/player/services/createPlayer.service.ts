import "reflect-metadata";
import { Player } from "../entities/player.entity";
import { PlayerRepository } from "../repositories/player.repository";
import { CreatePlayerDto } from "../dto/create-player.dto";

export default class CreatePlayerService {
  async execute(data: CreatePlayerDto): Promise<Player | string> {

    const NewPlayer = PlayerRepository.create(data);

    const player = await PlayerRepository.save(NewPlayer);

    return player;
  }
}
