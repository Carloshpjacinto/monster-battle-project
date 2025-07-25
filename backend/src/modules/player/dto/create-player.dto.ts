import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}
