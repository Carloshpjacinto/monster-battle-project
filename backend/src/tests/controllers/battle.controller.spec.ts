import { Request, Response } from "express";
import BattleController from "../../modules/battle/controller/battle.controller";
import CreateBattleService from "../../modules/battle/services/createBattle.service";
import FindBattleByIdService from "../../modules/battle/services/findBattleById.service";
import UpdateBattleService from "../../modules/battle/services/updateBattle.service";

jest.mock("../../modules/battle/services/createBattle.service");
jest.mock("../../modules/battle/services/findBattleById.service");
jest.mock("../../modules/battle/services/updateBattle.service");

describe("BattleController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {},
    };

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    res = {
      status: statusMock,
    };
  });

  describe("create", () => {
    it("deve retornar 201 e a batalha criada em caso de sucesso", async () => {
      const fakeBattle = { id: 1, players: [] };
      (CreateBattleService.prototype.execute as jest.Mock).mockResolvedValue(
        fakeBattle
      );

      const controller = new BattleController();
      await controller.create(req as Request, res as Response);

      expect(CreateBattleService.prototype.execute).toHaveBeenCalledWith(
        1,
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(fakeBattle);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (CreateBattleService.prototype.execute as jest.Mock).mockRejectedValue(
        new Error("Erro")
      );

      const controller = new BattleController();
      await controller.create(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        mensagem: "Erro interno no servidor",
      });
    });
  });

  describe("findById", () => {
    it("deve retornar 201 e a batalha encontrada em caso de sucesso", async () => {
      const fakeBattle = { id: 1, players: [] };
      (FindBattleByIdService.prototype.execute as jest.Mock).mockResolvedValue(
        fakeBattle
      );

      const controller = new BattleController();
      await controller.findById(req as Request, res as Response);

      expect(FindBattleByIdService.prototype.execute).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(fakeBattle);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (FindBattleByIdService.prototype.execute as jest.Mock).mockRejectedValue(
        new Error("Erro")
      );

      const controller = new BattleController();
      await controller.findById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        mensagem: "Erro interno no servidor",
      });
    });
  });

  describe("update", () => {
    it("deve retornar 201 e a batalha atualizada em caso de sucesso", async () => {
      const fakeBattle = { id: 1, status: "updated" };
      (UpdateBattleService.prototype.execute as jest.Mock).mockResolvedValue(
        fakeBattle
      );

      const controller = new BattleController();
      await controller.update(req as Request, res as Response);

      expect(UpdateBattleService.prototype.execute).toHaveBeenCalledWith(
        1,
        req.body
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(fakeBattle);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (UpdateBattleService.prototype.execute as jest.Mock).mockRejectedValue(
        new Error("Erro")
      );

      const controller = new BattleController();
      await controller.update(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        mensagem: "Erro interno no servidor",
      });
    });
  });
});
