import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/interfaces/userInterface";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
