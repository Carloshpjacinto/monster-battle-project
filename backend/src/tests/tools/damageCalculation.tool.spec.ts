import {
  damageCalculation,
  Response,
} from "../../tools/damageCalculation.tool";

describe("damageCalculation", () => {
  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve calcular o dano corretamente e retornar novo HP não negativo", async () => {
    const attack = 50;
    const defend = 20;
    const hp = 100;

    const result: Response = await damageCalculation(attack, defend, hp);

    expect(result.danoCausado).toBe(5);
    expect(result.newHp).toBe(95);
  });

  it("deve retornar novo HP zero se dano causar HP negativo", async () => {
    const attack = 100;
    const defend = 0;
    const hp = 10;

    const result: Response = await damageCalculation(attack, defend, hp);

    expect(result.danoCausado).toBe(50);
    expect(result.newHp).toBe(0);
  });
});
