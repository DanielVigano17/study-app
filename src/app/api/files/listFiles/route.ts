import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse){
    const materiaId = await req.json();
    console.log(materiaId);
    try{
        const fileCreated = await modules.useCase.file.listFiles.execute(materiaId);

        return NextResponse.json({files : fileCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }

}