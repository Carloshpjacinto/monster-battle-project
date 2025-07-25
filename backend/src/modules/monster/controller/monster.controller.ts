import { Request, Response } from "express";
import CreateMonsterService from "../services/createMonster.service";

export default class MonsterController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createMonsterService = new CreateMonsterService();

      const monster = await createMonsterService.execute(req.body);

      return res.status(201).json(monster);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
