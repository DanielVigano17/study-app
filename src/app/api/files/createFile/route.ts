import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const data = await req.json();
    
    try{
        const fileCreated = await modules.useCase.file.createFile.execute(data);

        return NextResponse.json({status : 200, file : fileCreated});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }

}