from fastapi import FastAPI, HTTPException,File, UploadFile
from starlette.middleware.cors import CORSMiddleware
import chatAPI

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
        with open(file.filename, "wb") as f:
            f.write(file.file.read())
        chatbot.handlePDF(file.filename)
        return {"message": "PDF loaded successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/chat/")
def create_item(params:dict):
    global chatbot
    print(params)
    result = chatbot.handleQuery(params['query'])


