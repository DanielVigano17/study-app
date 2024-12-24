export interface UpdateUserDTO {
    name: string
    image?: string
  }

  export interface IUserRepository {
    update : (id : string, data : UpdateUserDTO) => Promise<User>
    findById : (id:string) => Promise<User | null>;
  }