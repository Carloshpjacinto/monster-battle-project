import "reflect-metadata";
import { Monster } from "../entities/monster.entity";
import { MonsterRepository } from "../repositories/monster.repository";

export default class FindAllMonstersService {
  async execute(): Promise<Monster[] | null> {
    const monster = await MonsterRepository.find();

    return monster;
  }
}
