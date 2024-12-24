import { IUserRepository, UpdateUserDTO } from "@/domain/interfaces/userInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository{
    async findById(id: string) {
        return prisma.user.findUnique({where: {id}});
    };
    async update(id: string, data: UpdateUserDTO){
        return prisma.user.update({ where: { id }, data });
    };

}