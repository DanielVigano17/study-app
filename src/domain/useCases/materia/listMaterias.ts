import { IMateriaRepository } from "@/domain/interfaces/materiaInterface";
import { IUserRepository } from "@/domain/interfaces/userInterface";

export class ListMaterias {
    constructor(
        private materiaRepository : IMateriaRepository,
        private userRepository : IUserRepository
    ){}

    async execute(userId : string){
        const user = await this.userRepository.findById(userId);
        if(!user) return false;

        return await this.materiaRepository.listMaterias(userId);
    }
}