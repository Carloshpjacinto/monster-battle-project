import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBattleDto {
  @IsString()
  @IsNotEmpty()
  id_player!: number;

  @IsNumber()
  @IsNotEmpty()
  id_monster!: number;

  @IsNumber()
  @IsNotEmpty()
  id_arena!: number;
}
