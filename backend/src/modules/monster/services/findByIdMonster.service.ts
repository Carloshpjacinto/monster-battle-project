import "reflect-metadata";
import { Monster } from "../entities/monster.entity";
import { MonsterRepository } from "../repositories/monster.repository";

export default class FindByIdMonsterService {
  async execute(id: number): Promise<Monster | null> {
    const monster = await MonsterRepository.findById(id);

    return monster;
  }
}
