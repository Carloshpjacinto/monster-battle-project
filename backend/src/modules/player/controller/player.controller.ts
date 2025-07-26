import { Request, Response } from "express";
import CreatePlayerService from "../services/createPlayer.service";

export default class PlayerController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createPlayerService = new CreatePlayerService();

      const player = await createPlayerService.execute(req.body);

      return res.status(201).json(player);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
