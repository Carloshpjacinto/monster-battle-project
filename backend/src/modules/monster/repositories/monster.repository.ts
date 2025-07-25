import { AppDataSource } from "../../../database/data.source";
import { Monster } from "../entities/monster.entity"; 

export const MonsterRepository = AppDataSource.getRepository(Monster).extend({});
