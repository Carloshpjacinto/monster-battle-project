import CreateArenaService from "../../modules/arena/services/createArena.service";
import { ArenaRepository } from "../../modules/arena/repositories/arena.repository";

jest.mock("../../modules/arena/repositories/arena.repository");

describe("CreateArenaService", () => {
  it("deve criar e salvar uma nova arena e retornar a arena criada", async () => {
    const fakeData = {
      name: "Arena Teste",
      max_players: 2,
    };

    const createdArena = { id: 1, ...fakeData };

    (ArenaRepository.create as jest.Mock).mockReturnValue(createdArena);
    (ArenaRepository.save as jest.Mock).mockResolvedValue(createdArena);

    const service = new CreateArenaService();

    const result = await service.execute(fakeData);

    expect(ArenaRepository.create).toHaveBeenCalledWith(fakeData);
    expect(ArenaRepository.save).toHaveBeenCalledWith(createdArena);
    expect(result).toEqual(createdArena);
  });
});
