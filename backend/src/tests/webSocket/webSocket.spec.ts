import { Server } from "socket.io";
import { createServer } from "http";
import Client from "socket.io-client";

import UpdateBattleService from "../../modules/battle/services/updateBattle.service";
import { damageCalculation } from "../../tools/damageCalculation.tool";
import { summaryPlayer } from "../../tools/sumarryPlayer.tool";

jest.mock("../../modules/battle/services/updateBattle.service");
jest.mock("../../tools/damageCalculation.tool");
jest.mock("../../tools/sumarryPlayer.tool");

describe("Socket.io battle events", () => {
  let ioServer: Server;
  let httpServer: any;
  let httpServerAddr: any;
  let clientSocket: any;

  beforeAll((done) => {
    httpServer = createServer();
    ioServer = new Server(httpServer);

    ioServer.on("connection", (socket) => {
      socket.on("start", async (battleId) => {
        const infoBattle = await summaryPlayer(battleId);
        const updateBattleService = new UpdateBattleService();

        socket.join(`battle-${battleId}`);

        const playerGoesFirst =
          infoBattle.Player1.monster.speed >= infoBattle.Player2.monster.speed;
        infoBattle.Player1.attack_turn = playerGoesFirst;

        ioServer
          .to(`battle-${battleId}`)
          .emit(
            "log",
            playerGoesFirst
              ? `Você ataca primeiro`
              : `O adversário ataca primeiro`
          );
      });
    });

    httpServer.listen(() => {
      httpServerAddr = httpServer.address();
      done();
    });
  });

  afterAll(() => {
    ioServer.close();
    httpServer.close();
  });

  beforeEach((done) => {
    clientSocket = Client(`http://localhost:${httpServerAddr.port}`);
    clientSocket.on("connect", done);
  });

  afterEach(() => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }
    jest.clearAllMocks();
  });

  it("deve iniciar batalha e emitir logs", (done) => {
    (summaryPlayer as jest.Mock).mockResolvedValue({
      Player1: {
        monster: { speed: 20 },
        attack_turn: false,
      },
      Player2: {
        monster: { speed: 10 },
      },
    });

    (UpdateBattleService as jest.Mock).mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue(true),
    }));

    (damageCalculation as jest.Mock).mockResolvedValue({
      newHp: 50,
      danoCausado: 10,
    });

    clientSocket.on("log", (msg: any) => {
      expect(
        msg === "Você ataca primeiro" || msg.startsWith("Adversário atacou")
      ).toBeTruthy();
      done();
    });

    // Act
    clientSocket.emit("start", 1);
  });
});
