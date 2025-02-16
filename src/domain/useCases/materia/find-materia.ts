import { CreateMateriaDTO, IMateriaRepository } from "@/domain/interfaces/materiaInterface";

export class FindMateriaUseCase {

    constructor (private materiaRepository : IMateriaRepository){}
    async execute(materiaId : string){
        const materia = await this.materiaRepository.find(materiaId);

        return materia;
    }
}