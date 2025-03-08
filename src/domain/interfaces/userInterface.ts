import { User } from "../entities/User"

export interface UpdateUserDTO {
    name?: string
    image?: string
    customerId? : string
    subscriptionId? : string
  }

  export interface IUserRepository {
    update : (id : string, data : UpdateUserDTO) => Promise<User>
    findById : (id:string) => Promise<User | null>;
    calculateFeatureUsage(userId: string): Promise<FeatureUsage>;
  }

  export interface FeatureUsage {
    [key: string]: number;
  }