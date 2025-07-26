import "reflect-metadata";
import { Result } from "../entities/result.entity";
import { ResultRepository } from "../repositories/result.repository";
import FindBattleByIdService from "../../battle/services/findBattleById.service";

type Results = {
  initialPlayer1: Result;
  initialPlayer2: Result;
};

export default class CreateInitialResultService {
  async execute(id_batttle: number): Promise<Results> {
    const findBattleByIdService = new FindBattleByIdService();

    const battle = await findBattleByIdService.execute(id_batttle);

    if (!battle) {
      throw new Error("Batalha não encontrada");
    }

    const initialResulPlayer1 = {
      battle: battle,
      name_arena: battle?.arena.name,
      name_player: battle?.player1.name,
      name_monster: battle?.monster_player1.name,
      hp: battle?.monster_player1.hp,
      attack: battle?.monster_player1.attack,
      defend: battle?.monster_player1.defend,
      speed: battle?.monster_player1.speed,
      special: true,
      turn_of_attack: false,
    };

    const NewResult = ResultRepository.create(initialResulPlayer1);
    const initialPlayer1 = await ResultRepository.save(NewResult);

    const initialResulPlayer2 = {
      battle: battle,
      name_arena: battle?.arena.name,
      name_player: battle?.player2.name,
      name_monster: battle?.monster_player2.name,
      hp: battle?.monster_player2.hp,
      attack: battle?.monster_player2.attack,
      defend: battle?.monster_player2.defend,
      speed: battle?.monster_player2.speed,
      special: true,
      turn_of_attack: false,
    };

    const NewResult2 = ResultRepository.create(initialResulPlayer2);
    const initialPlayer2 = await ResultRepository.save(NewResult2);

    return {
      initialPlayer1,
      initialPlayer2,
    };
  }
}
