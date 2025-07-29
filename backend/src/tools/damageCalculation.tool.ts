export type Response = {
  newHp: number;
  danoCausado: number;
};

export async function damageCalculation(
  attack: number,
  defend: number,
  hp: number
): Promise<Response> {
  const critico = Math.random();
  const danoCausado = Math.abs(attack * critico - defend);

  let newHp = Math.ceil(hp - danoCausado);

  console.log(critico, newHp);

  if (newHp < 0) newHp = 0;

  return {
    newHp: newHp,
    danoCausado: danoCausado,
  };
}
