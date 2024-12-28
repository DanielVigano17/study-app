export interface CreateMateriaDTO {
    titulo : string
    userId:  string
}

export interface UpdateMateriaDTO {
    titulo : string
}

export interface IMateriaRepository{
    update: (id: string, data : UpdateMateriaDTO) => Promise<Materia>
    listMaterias : (userId : string) => Promise<Materia[]>
    create : (data : CreateMateriaDTO) => Promise<Materia>
}