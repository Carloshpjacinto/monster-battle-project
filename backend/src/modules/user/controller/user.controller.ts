import { Request, Response } from "express";
import CreateUserService from "../services/createUser.service";

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute(req.body);

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }
}
