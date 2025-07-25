import { Request, Response } from "express";
import CreateBattleService from "../services/createBattle.service";

export default class BattleController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createBattleService = new CreateBattleService();

      const battle = await createBattleService.execute(req.body);

      return res.status(201).json(battle);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
