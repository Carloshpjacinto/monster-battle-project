import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Player } from "../../player/entities/player.entity";
import { Arena } from "../../arena/entities/arena.entity";
import { Monster } from "../../monster/entities/monster.entity";

@Entity("battle")
export class Battle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  turn_of_attack!: boolean;

  @Column()
  turn_counter!: number;

  @OneToOne(() => Arena)
  @JoinColumn({ name: "id_arena" })
  id_arena!: Arena;

  @ManyToOne(() => Monster)
  @JoinColumn({ name: "id_monster" })
  id_monster!: Monster;

  @OneToOne(() => Player)
  @JoinColumn({ name: "id_player" })
  id_player!: Player;
}
