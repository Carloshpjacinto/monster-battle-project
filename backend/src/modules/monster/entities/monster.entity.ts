import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("monsters")
export class Monster {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

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
}
