import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBattleDto {
  @IsNumber()
  @IsNotEmpty()
  id_monsterPlayer!: number;

  @IsNumber()
  @IsNotEmpty()
  id_arena!: number;

  @IsNumber()
  @IsNotEmpty()
  id_monsterBot!: number;
}
