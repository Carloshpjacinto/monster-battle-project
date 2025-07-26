import "reflect-metadata";
import { BattleArenaRepository } from "../repositories/battle.repository";
import { Battle } from "../entities/battle.entity";
import CreateInitialResultService from "../../result/services/createInitialResult.service";

export default class StartBattleService {
  async execute(id_battle: number): Promise<string | null> {
    const createInitialResultService = new CreateInitialResultService();

    const teste = await createInitialResultService.execute(id_battle);

    if (
      Number(teste.initialPlayer1.speed) > Number(teste.initialPlayer2.speed)
    ) {
      return `Batalha iniciada, seu ${teste.initialPlayer1.name_monster} tem ${teste.initialPlayer1.speed} de velocidade, é maior que ${teste.initialPlayer2.speed} do ${teste.initialPlayer2.name_monster} do adversario, você inicia atacando!`;
    } else {
      return `Batalha iniciada, seu ${teste.initialPlayer1.name_monster} tem ${teste.initialPlayer1.speed} de velocidade, é menor que ${teste.initialPlayer2.speed} do ${teste.initialPlayer2.name_monster} do adversario, ele inicia atacando!`;
    }
  }
}
