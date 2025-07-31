import { MonsterRepository } from "../../modules/monster/repositories/monster.repository";
import { Monster } from "../../types/monster";

describe("MonsterRepository", () => {
  describe("findById", () => {
    it("deve retornar um monstro quando encontrar pelo id", async () => {
      const monsterMock = {
        id: 1,
        name: "MonsterTeste",
        hp: 2,
        attack: 5,
        defend: 5,
        speed: 5,
      };

      const findOneByMock = jest
        .spyOn(MonsterRepository, "findOneBy")
        .mockResolvedValue(monsterMock);

      const result = await MonsterRepository.findById(1);

      expect(findOneByMock).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(monsterMock);

      findOneByMock.mockRestore();
    });

    it("deve retornar null quando não encontrar o monstro", async () => {
      const findOneByMock = jest
        .spyOn(MonsterRepository, "findOneBy")
        .mockResolvedValue(null);

      const result = await MonsterRepository.findById(999);

      expect(findOneByMock).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();

      findOneByMock.mockRestore();
    });
  });
});
