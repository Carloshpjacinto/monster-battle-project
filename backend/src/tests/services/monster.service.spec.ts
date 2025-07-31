import CreateMonsterService from "../../modules/monster/services/createMonster.service";
import { MonsterRepository } from "../../modules/monster/repositories/monster.repository";

jest.mock("../../modules/monster/repositories/monster.repository");

describe("CreateMonsterService", () => {
  it("deve criar e salvar um novo monstro e retornar o monstro criado", async () => {
    const fakeData = {
      name: "Monstro Teste",
      attack: 10,
      defend: 5,
      hp: 100,
      speed: 20,
    };

    const createdMonster = { id: 1, ...fakeData };

    (MonsterRepository.create as jest.Mock).mockReturnValue(createdMonster);
    (MonsterRepository.save as jest.Mock).mockResolvedValue(createdMonster);

    const service = new CreateMonsterService();

    const result = await service.execute(fakeData);

    expect(MonsterRepository.create).toHaveBeenCalledWith(fakeData);
    expect(MonsterRepository.save).toHaveBeenCalledWith(createdMonster);
    expect(result).toEqual(createdMonster);
  });
});
