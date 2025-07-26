import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBattleDto {
  @IsNumber()
  @IsNotEmpty()
  id_monster!: number;

  @IsNumber()
  @IsNotEmpty()
  id_arena!: number;
}
