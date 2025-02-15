import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const materiaId : string = await req.json();
    try{
        const materiaDeleted = await modules.useCase.materia.deleteMateria.execute(materiaId);

        return NextResponse.json({status : 200, materia : materiaDeleted});
    }catch(e){
        console.error(e);
        return NextResponse.json({status : 400})
    }
}