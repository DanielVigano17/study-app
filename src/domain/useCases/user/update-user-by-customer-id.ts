import { User } from "@/domain/entities/User";
import { IUserRepository, UpdateUserDTO } from "@/domain/interfaces/userInterface";

export class UpdateUserByCustomerIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(customerId: string, data: UpdateUserDTO): Promise<User | null> {
    // Lógica de negócio: verificar se o usuário existe
    const user = await this.userRepository.findByCustomerId(customerId);
    if (!user) {
      throw new Error("User not found.");
    }

    // Atualizar o usuário
    return this.userRepository.update(user.id, data);
  }
}
