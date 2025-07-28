import "reflect-metadata";
import CreateInitialResultService from "../../result/services/createInitialResult.service";
import { damageCalculation } from "../tools/damageCalculation.tool";

export default class StartBattleService {
  async execute(id_battle: number): Promise<string | any> {
    const createInitialResultService = new CreateInitialResultService();

    const result = await createInitialResultService.execute(id_battle);

    if (
      Number(result.initialPlayer1.speed) > Number(result.initialPlayer2.speed)
    ) {
      return {
        mensagem: `Batalha iniciada, seu ${result.initialPlayer1.name_monster} tem ${result.initialPlayer1.speed} de velocidade, é maior que ${result.initialPlayer2.speed} do ${result.initialPlayer2.name_monster} do adversario, você inicia atacando!`,
        status: `Para iniciar o ataque: http://localhost:3000/battle/start/attack/${id_battle}`,
      };
    } else {
      const resultCalculation = await damageCalculation(
        result.initialPlayer2.attack,
        result.initialPlayer1.defend,
        result.initialPlayer1.hp
      );

      return {
        mensagem: `Batalha iniciada, seu ${result.initialPlayer1.name_monster} tem ${result.initialPlayer1.speed} de velocidade, é menor que ${result.initialPlayer2.speed} do ${result.initialPlayer2.name_monster} do adversário, ele inicia atacando!`,
        status: "ataque inicial realizado",
        dano_causado: resultCalculation.danoCausado.toString(),
        Hp_atual: resultCalculation.newHp.toString(),
      };
    }
  }
}
