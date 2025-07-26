import { Request, Response } from "express";
import CreateBattleService from "../services/createBattle.service";
import FindBattleByIdService from "../services/findBattleById.service";

export default class BattleController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createBattleService = new CreateBattleService();

      const idPlayer = Number(req.params.id);

      const battle = await createBattleService.execute(idPlayer, req.body);

      return res.status(201).json(battle);
    } catch (error) {
      console.error("Erro ao cadastrar Batalha:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const findBattleByIdService = new FindBattleByIdService();

      const idPlayer = Number(req.params.id);

      const battle = await findBattleByIdService.execute(idPlayer);

      return res.status(201).json(battle);
    } catch (error) {
      console.error("Erro ao procurar Batalha:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
