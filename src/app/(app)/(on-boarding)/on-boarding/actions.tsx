"use server"

import { modules } from "@/domain";

const actionSalvarNome = async (id:string | undefined, name : string) => {

    if(!id) throw new Error("Id inválido");

    const user = await modules.useCase.user.updateUser.execute(id, {name});
}

export default actionSalvarNome;
