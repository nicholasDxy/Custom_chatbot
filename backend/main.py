from fastapi import FastAPI, HTTPException, File, UploadFile
from starlette.middleware.cors import CORSMiddleware
import uuid
from chatAPI import chatbot


async def lifespan(app: FastAPI):
    print("init!")
    yield

app = FastAPI(lifespan=lifespan)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])


@app.post("/uploadpdf/")
def create_item(file: UploadFile):
    return chatbot.handlePDF(file)


@app.post("/chat/")
def create_item(params: dict):
    print(params)
    result = chatbot.handleQuery(params['query'], params['uid'])
    return result


@app.get("/files/")
def create_item():
    result = chatbot.getFiles()
    return result
