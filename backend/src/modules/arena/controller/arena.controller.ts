import { Request, Response } from "express";
import CreateArenaService from "../services/createArena.service";
import FindAllArenaService from "../services/findAllArena.service";
import FindByIdArenaService from "../services/findByIdArena.service";

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

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const findAllArenaService = new FindAllArenaService();

      const arenas = await findAllArenaService.execute();

      return res.status(201).json(arenas);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const findByIdArenaService = new FindByIdArenaService();

      const idArena = Number(req.params.id);

      const arenas = await findByIdArenaService.execute(idArena);

      return res.status(201).json(arenas);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
