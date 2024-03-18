from fastapi import FastAPI, HTTPException,File, UploadFile
from starlette.middleware.cors import CORSMiddleware
import chatAPI
import uuid

chatbot = None
async def lifespan(app: FastAPI):
    global chatbot
    chatbot = chatAPI.Chatbot()
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
    global chatbot
    try:
        file_path = f'files/{uuid.uuid4()[:8]}_{file.filename}'
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        chatbot.handlePDF(file_path)
        return {"message": "PDF loaded successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/chat/")
def create_item(params:dict):
    global chatbot
    print(params)
    result = chatbot.handleQuery(params['query'])
    return result

@app.get("/files/")
def create_item():
    global chatbot
    result = chatbot.getFiles()
    return result

