type response = {
  newHp: number;
  danoCausado: number;
};

export async function damageCalculation(
  attack: any,
  defend: any,
  hp?: any
): Promise<response> {
  const danoCausado = Math.abs(Number(attack) - Number(defend));

  const newHp = Math.abs(hp - danoCausado);

  return {
    newHp: newHp,
    danoCausado: danoCausado,
  };
}
