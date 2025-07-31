import { Request, Response } from "express";
import CreateMonsterService from "../services/createMonster.service";
import FindAllMonstersService from "../services/findAllMonsters.service";
import FindByIdMonsterService from "../services/findByIdMonster.service";

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

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const findAllMonstersService = new FindAllMonstersService();

      const monster = await findAllMonstersService.execute();

      return res.status(201).json(monster);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const findByIdMonsterService = new FindByIdMonsterService();

      const idMonster = Number(req.params.id);

      const monster = await findByIdMonsterService.execute(idMonster);

      return res.status(201).json(monster);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
