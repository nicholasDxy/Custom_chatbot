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
import os

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
        self.document_chain = create_stuff_documents_chain(chat, question_answering_prompt)

    def handlePDF(self, pdf):
        loader = PyPDFLoader(pdf)
        pages = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
        for p in pages:
            p.page_content = p.page_content.replace('\n', ' ')
        data = text_splitter.split_documents(pages)
        embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        self.db = Chroma.from_documents(data, embedding_function)
        # k is the number of chunks to retrieve
        self.retriever = self.db.as_retriever(k=4)
        
        # todo  calculate the per token in a page
    
    def handleQuery(self, query):
        docs = self.retriever.invoke(query)
        result = []
        for d in docs:
            result.append(d.page_content)
        docs = self.retriever.invoke(query)
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
        return result

    def getFiles(self):
        folder_path = './files'
        file_names = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        return file_names
    