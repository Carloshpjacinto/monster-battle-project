import { Request, Response } from "express";
import PlayerController from "../../modules/player/controller/player.controller"; 
import CreatePlayerService from "../../modules/player/services/createPlayer.service"; 

jest.mock("../../modules/player/services/createPlayer.service");

describe("PlayerController - create", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: { nome: "Carlos", socketId: "socket123" },
    };

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    res = {
      status: statusMock,
    };
  });

  it("deve retornar 201 e os dados do player quando criado com sucesso", async () => {
    const fakePlayer = { id: 1, nome: "Carlos", socketId: "socket123" };
    (CreatePlayerService.prototype.execute as jest.Mock).mockResolvedValue(
      fakePlayer
    );

    const controller = new PlayerController();
    await controller.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(fakePlayer);
  });

  it("deve retornar 500 quando ocorre um erro interno", async () => {
    (CreatePlayerService.prototype.execute as jest.Mock).mockRejectedValue(
      new Error("Erro")
    );

    const controller = new PlayerController();
    await controller.create(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      mensagem: "Erro interno no servidor",
    });
  });
});
