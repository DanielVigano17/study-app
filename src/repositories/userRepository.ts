import { IUserRepository, UpdateUserDTO } from "@/domain/interfaces/userInterface";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/prisma";

export class UserRepository implements IUserRepository{
    async findById(id: string) {
        return await prisma.user.findUnique({where: {id}});
    };
    async update(id: string, data: UpdateUserDTO){
        return await prisma.user.update({ where: { id }, data });
    };

}