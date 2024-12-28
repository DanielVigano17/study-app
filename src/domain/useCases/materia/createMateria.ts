import { CreateMateriaDTO, IMateriaRepository } from "@/domain/interfaces/materiaInterface";

export class CreateMateria {

    constructor (private materiaRepository : IMateriaRepository){}
    async execute(data : CreateMateriaDTO){
        const materia = await this.materiaRepository.create(data);

        return materia;
    }
}