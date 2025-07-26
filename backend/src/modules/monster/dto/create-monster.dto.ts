import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMonsterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  hp!: number;

  @IsNumber()
  @IsNotEmpty()
  attack!: number;

  @IsNumber()
  @IsNotEmpty()
  defend!: number;

  @IsNumber()
  @IsNotEmpty()
  speed!: number;
}
