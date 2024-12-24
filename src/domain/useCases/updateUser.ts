import { IUserRepository, UpdateUserDTO } from "../interfaces/userInterface";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User | null> {
    // Lógica de negócio: verificar se o usuário existe
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    // Atualizar o usuário
    return this.userRepository.update(id, data);
  }
}
