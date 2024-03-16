'use server'
import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { embeddingDataset } from "@/app/component/rag";

export const GET = async () =>{
    console.log('sss')
    return NextResponse.json({"1":1})
}


export const POST = async (req) => {
    console.log(req.body)
    // const blob = await req.blob();
    // console.log(blob);
    // embeddingDataset(blob)
    // const loader = new PDFLoader(blob, {
    //     splitPages: true,
    //   });
    // const docs = await loader.load();
    // docs.forEach((item)=>{
    // item.pageContent = item.pageContent.replace(/\n/g," ")})
    // console.log(docs[0]);
    return NextResponse.json({"1":1})
}