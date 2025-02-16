import { modules } from "@/domain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const data = await req.json();
    
    try{
        const fileRemoved = await modules.useCase.file.deleteFile.execute(data.fileId,data.filePath);

        return NextResponse.json({status : 200, file : fileRemoved});
    }catch(e){
        console.log(e);

        return NextResponse.json({status : 400})
    }

}