import { summaryPlayer } from "../../tools/sumarryPlayer.tool";
import FindBattleByIdService from "../../modules/battle/services/findBattleById.service";

jest.mock("../../modules/battle/services/findBattleById.service");

describe("summaryPlayer", () => {
  const mockExecute = jest.fn();

  beforeAll(() => {
    // Faz o mock do método execute da classe FindBattleByIdService
    (FindBattleByIdService as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  beforeEach(() => {
    mockExecute.mockReset();
  });

  it("deve retornar o resumo dos jogadores quando encontrar a batalha", async () => {
    mockExecute.mockResolvedValue({
      player1: { name: "Jogador1" },
      player2: { name: "Jogador2" },
      monster_player1: {
        name: "Monstro1",
        hp: 100,
        attack: 50,
        defend: 30,
        speed: 20,
      },
      monster_player2: {
        name: "Monstro2",
        hp: 80,
        attack: 40,
        defend: 25,
        speed: 25,
      },
    });

    const result = await summaryPlayer(1);

    expect(result.Player1.name).toBe("Jogador1");
    expect(result.Player1.monster.name).toBe("Monstro1");
    expect(result.Player1.monster.hp).toBe(100);
    expect(result.Player2.name).toBe("Jogador2");
    expect(result.Player2.monster.speed).toBe(25);
    expect(result.Player1.attack_turn).toBe(false);
  });

  it("deve lançar erro se batalha não for encontrada", async () => {
    mockExecute.mockResolvedValue(null);

    await expect(summaryPlayer(999)).rejects.toThrow(
      "Battle Id não encontrado"
    );
  });
});
