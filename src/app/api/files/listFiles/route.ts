import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const materiaId = await req.json();
    try{
        const fileCreated = await modules.useCase.file.listFiles.execute(materiaId);

        return NextResponse.json({files : fileCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }

}