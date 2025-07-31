export type battleDetail = {
  id: number;
  arena: {
    name: string;
    max_player: number;
  };
  Player: {
    name: string;
    monster: string;
    hp: number;
    ataque: number;
    defesa: number;
    velocidade: number;
  };

  Bot: {
    name: string;
    monster: string;
    hp: number;
    ataque: number;
    defesa: number;
    velocidade: number;
  };
};
