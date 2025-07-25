import "reflect-metadata";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";

export default class CreateUserService {
  async execute(data: CreateUserDto): Promise<User | string> {
    const NewUser = UserRepository.create(data);

    const user = await UserRepository.save(NewUser);

    return user;
  }
}
