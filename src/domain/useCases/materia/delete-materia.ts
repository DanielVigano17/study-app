import { Materia } from "@/domain/entities/Materia";
import { IMateriaRepository } from "@/domain/interfaces/materiaInterface";


export default class DeleteMateriaUseCase {

    constructor(private materiaRepository : IMateriaRepository){}
    async execute(materiaId : string) : Promise<Materia | null>{
        try{
            const materiaExcluida = await this.materiaRepository.delete(materiaId);
            return materiaExcluida;
            
        }catch(error){
            console.error(error);
            return null;
        }
    }
}