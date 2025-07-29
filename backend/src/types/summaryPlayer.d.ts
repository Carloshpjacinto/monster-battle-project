import { Monster } from "./monster";

export type Player = {
  name: string;
  monster: Monster;
  attack_turn: boolean;
};
