import { IUserRepository, FeatureUsage } from "@/domain/interfaces/userInterface";

export class CalculateFeatureUsage {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<FeatureUsage> {
        return this.userRepository.calculateFeatureUsage(userId);
    }
} 