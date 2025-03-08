import { IUserRepository, UpdateUserDTO } from "@/domain/interfaces/userInterface";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/prisma";

interface FeatureUsage {
  [key: string]: number;
}

export class UserRepository implements IUserRepository {
    async findById(id: string) {
        return await prisma.user.findUnique({where: {id}});
    };
    
    async update(id: string, data: UpdateUserDTO){
        return await prisma.user.update({ where: { id }, data });
    };

    async calculateFeatureUsage(userId: string): Promise<FeatureUsage> {
        const [flashcardsCount, quizzesCount, materiasCount] = await Promise.all([
            prisma.flashcard.count({
                where: {
                    materia: {
                        userId: userId
                    }
                }
            }),
            prisma.questionario.count({
                where: {
                    materia: {
                        userId: userId
                    }
                }
            }),
            prisma.materia.count({
                where: { userId }
            })
        ]);

        return {
            flashcards: flashcardsCount,
            quizzes: quizzesCount,
            materias: materiasCount
        };
    }
}