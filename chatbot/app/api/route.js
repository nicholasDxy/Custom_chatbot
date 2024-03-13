import { NextResponse } from "next/server";
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const upload = multer({ dest: 'public/uploads/' });

export const GET = async () =>{
    console.log('sss')
    return NextResponse.json({"1":1})
}


export const POST = async (req) =>{
    console.log(req.body)
    const blob = await req.blob();
    console.log(blob);
    const loader = new PDFLoader(blob, {
        splitPages: false,
      });
    const docs = await loader.load();
    console.log(docs);
    // console.log(res)
    // res.status(200).json({ message: 'Hello from Next.js!' })
    return NextResponse.json({"1":1})
}