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

  @OneToOne(() => Arena)
  @JoinColumn({ name: "id_arena" })
  arena!: Arena;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "id_player1" })
  player1!: Player;

  @ManyToOne(() => Player)
  @JoinColumn({ name: "id_player2" })
  player2!: Player;

  @ManyToOne(() => Monster)
  @JoinColumn({ name: "id_monster_player1" })
  monster_player1!: Monster;

  @ManyToOne(() => Monster)
  @JoinColumn({ name: "id_monster_player2" })
  monster_player2!: Monster;

  @Column()
  turn_counter!: number;

  @Column()
  player_wins!: string;
}
