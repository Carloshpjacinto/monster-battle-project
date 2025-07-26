import "reflect-metadata";
import { Result } from "../entities/result.entity";
import { ResultRepository } from "../repositories/result.repository";

export default class FindByIdResultService {
  async execute(id: number): Promise<Result | null> {
    const result = await ResultRepository.findById(id);

    return result;
  }
}
