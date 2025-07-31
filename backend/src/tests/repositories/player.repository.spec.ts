import { PlayerRepository } from "../../modules/player/repositories/player.repository";
import { Player } from "../../types/summaryPlayer";

describe("PlayerRepository", () => {
  describe("findById", () => {
    it("deve retornar um player quando encontrar pelo id", async () => {
      const playerMock = { id: 1, name: "Carlos" };

      // Mockar o método findOneBy do repositório
      const findOneByMock = jest
        .spyOn(PlayerRepository, "findOneBy")
        .mockResolvedValue(playerMock);

      const result = await PlayerRepository.findById(1);

      expect(findOneByMock).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(playerMock);

      findOneByMock.mockRestore();
    });

    it("deve retornar null quando não encontrar player", async () => {
      const findOneByMock = jest
        .spyOn(PlayerRepository, "findOneBy")
        .mockResolvedValue(null);

      const result = await PlayerRepository.findById(999);

      expect(findOneByMock).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();

      findOneByMock.mockRestore();
    });
  });
});
