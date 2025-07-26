import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Battle } from "../../battle/entities/battle.entity";

@Entity("result")
export class Result {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Battle)
  @JoinColumn({ name: "id_battle" })
  battle!: Battle;

  @Column()
  name_arena!: string;

  @Column()
  name_player!: string;

  @Column()
  name_monster!: string;

  @Column()
  hp!: number;

  @Column()
  attack!: number;

  @Column()
  defend!: number;

  @Column()
  speed!: number;

  @Column()
  special!: boolean;

  @Column()
  turn_of_attack!: boolean;
}
