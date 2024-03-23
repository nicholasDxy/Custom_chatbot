from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import CharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
import dotenv
from langchain_core.messages import HumanMessage
from filesutil import FileManager
import uuid
from datetime import datetime, timedelta
dotenv.load_dotenv()


class Chatbot:

    def __init__(self):

        SYSTEM_TEMPLATE = """
        Answer the user's questions based on the below context. 
        If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

        <context>
        {context}
        </context>
        """
        chat = ChatOpenAI(model="gpt-3.5-turbo-1106", temperature=0.2)
        question_answering_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    SYSTEM_TEMPLATE,
                ),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )
        self.document_chain = create_stuff_documents_chain(
            chat, question_answering_prompt)
        self.fileManager = FileManager()
        self.retriever_list = {}

    def handlePDF(self, file: UploadFile):
        try:
            file_uid = str(uuid.uuid4())[:8]
            file_path = f'files/{file_uid}_{file.filename}'
            with open(file_path, "wb") as f:
                f.write(file.file.read())
            self.loadPDF(file_path, file_uid)
            return {"message": "PDF loaded successfully", 'uid': file_uid, 'name': str(file.filename)}
        except Exception as e:
            return {"message": "error! " + str(e)}

    def loadPDF(self, pdf, uid):
        loader = PyPDFLoader(pdf)
        pages = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500, chunk_overlap=0)
        for p in pages:
            p.page_content = p.page_content.replace('\n', ' ')
        data = text_splitter.split_documents(pages)
        embedding_function = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2")
        db = Chroma.from_documents(data, embedding_function)
        # k is the number of chunks to retrieve
        self.retriever_list[uid] = {
            'retriever': db.as_retriever(k=4), 'timestamp': datetime.now()}

    def handleQuery(self, query, uid):
        print(self.retriever_list)
        if uid not in self.retriever_list:
            return {"message": "No file loaded for this user", 'answer': "No file loaded for this user, please choose a file first"}
        retriever = self.retriever_list[uid]['retriever']
        self.retriever_list[uid]['timestamp'] = datetime.now()
        docs = retriever.invoke(query)
        print('docs: ', docs)
        result = self.document_chain.invoke(
            {
                "context": docs,
                "messages": [
                    HumanMessage(content=query)
                ],
            }
        )
        print(result)
        return {'message': 'success', 'answer': result}

    def getFiles(self):
        # return self.fileManager.getFiles()
        return []

    def cleanup_files(self):
        now = datetime.now()
        for retriever in self.retriever_list:
            if now - self.retriever_list[retriever]['timestamp'] > timedelta(minutes=5):
                del self.retriever_list[retriever]


chatbot = Chatbot()
