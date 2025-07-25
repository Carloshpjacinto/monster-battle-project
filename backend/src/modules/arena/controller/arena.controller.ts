import { Request, Response } from "express";
import CreateArenaService from "../services/createArena.service";

export default class ArenaController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createArenaService = new CreateArenaService();

      const arena = await createArenaService.execute(req.body);

      return res.status(201).json(arena);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
