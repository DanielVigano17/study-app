"use server"

import { UpdateUserUseCase } from "@/domain/useCases/updateUser";
import { UserRepository } from "@/repositories/userRepository";

const actionSalvarNome = async (id:string | undefined, name : string) => {
    const userRepository = new UserRepository;
    const updateUser = new UpdateUserUseCase(userRepository);

    if(!id) throw new Error("Id inválido");

    const user = await updateUser.execute(id, {name});
}

export default actionSalvarNome;
