import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function embeddingDataset(blob) {
  const loader = new PDFLoader(blob, {
    splitPages: true,
  });
const docs = await loader.load();
docs.forEach((item)=>{
item.pageContent = item.pageContent.replace(/\n/g," ")})
// Create vector store and index the docs
const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
  collectionName: "a-test-collection",
  url: "http://localhost:8000", // Optional, will default to this value
  collectionMetadata: {
    "hnsw:space": "cosine",
  }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
});
const response = await vectorStore.similaritySearch("nlp", 2);
console.log(response);
}

