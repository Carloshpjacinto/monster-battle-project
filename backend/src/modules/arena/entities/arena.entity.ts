import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("arenas")
export class Arena {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  max_players!: number;
}
