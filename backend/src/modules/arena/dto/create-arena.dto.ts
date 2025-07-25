import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateArenaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  max_players!: number;
}
