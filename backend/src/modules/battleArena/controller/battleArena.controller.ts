import { Request, Response } from "express";
import CreateBattleArenaService from "../services/createBattleArena.service";

export default class BattleArenaController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createBattleArenaService = new CreateBattleArenaService();

      const battleArena = await createBattleArenaService.execute(req.body);

      return res.status(201).json(battleArena);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
