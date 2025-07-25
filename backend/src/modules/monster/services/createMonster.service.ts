import "reflect-metadata";
import { Monster } from "../entities/monster.entity";
import { MonsterRepository } from "../repositories/monster.repository";
import { CreateMonsterDto } from "../dto/create-monster.dto";

export default class CreateMonsterService {
  async execute(data: CreateMonsterDto): Promise<Monster | string> {
    const NewMonster = MonsterRepository.create(data);

    const monster = await MonsterRepository.save(NewMonster);

    return monster;
  }
}
