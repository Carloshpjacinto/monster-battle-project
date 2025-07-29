import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBattleDto {
  @IsNumber()
  @IsNotEmpty()
  turn_counter!: number;

  @IsString()
  @IsNotEmpty()
  player_wins!: string;
}
