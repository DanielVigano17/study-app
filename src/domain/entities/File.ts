import { Materia } from "./Materia"

export interface File {
    id : string
    fileName : string
    materiaId : string
    url : string
    supabaseId:  string
    materia? : Materia
}