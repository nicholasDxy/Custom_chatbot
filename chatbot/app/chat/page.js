'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/perfume_logo.png"
import user from "../../assets/user.png"
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { formateDay, formateTime } from "@/tools/date";
import { fetchEventSource } from '@microsoft/fetch-event-source';

export default function ChatPage() {

    const ROLE_BOT = 'bot'
    const ROLE_USER = 'user'
    const chatId = useRef(0);
    const initialHistory = [{ 'id': chatId.current, 'role': 'bot', 'content': 'Welcome to Perfume GPT!', 'time': Date.now() }]

    const searchParams = useSearchParams()
    const question = searchParams.get('question')
    const [chatHistory, setChatHistory] = useState(initialHistory);
    const [inputValue, setInputValue] = useState('');
    const [inputStatus, setInputStatus] = useState(true);
    const streamData = useRef('');
    const cache = useRef(false);
    console.log("chatitem" + JSON.stringify(chatHistory))

    useEffect(() => {
        if (!cache.current) {
            chatId.current++
            console.log(question)
            cache.current = true
        }
    }, [])


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    async function doQuery(question) {
        if (question != null && question != '') {
            addChat(ROLE_USER, question)
            setInputValue('')
            // setInputValue(()=>'waiting for answer')
            // setInputStatus(()=>false)
            handleQuery(question)
        }
    }

    async function handleQuery(query) {
        await fetch(`${BASE_URL}/chat/`,{
          method:"post",
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({'query':query})
      }).then((response) => response.json())
      .then((data) => {
        console.log('handleQuery:', data)
        addChat(ROLE_BOT, ans['answer'])
      })
      .catch((error) => console.error('Error deleting object:', error));
      }

    function clearChat() {
        setChatHistory((ch) => initialHistory)
    }

    function addChat(role, content) {
        console.log(`add Chat content: ${content}, id ${chatId.current}`)
        let value = chatId.current
        setChatHistory((ch) => [...ch, { 'id': value, 'role': role, 'content': content, 'time': Date.now() }])
        chatId.current++
        // console.log(chatId)
    }

    function extendChatContent(content) {
        streamData.current+=content
        console.log(`streamData = ${streamData.current}`)
        setChatHistory((data) => {
            data[data.length - 1]['content'] = streamData.current
            return data
        })
        setChatHistory((data)=>[...data]) //avoid no rerendering after receiving data
    }


    return (
        <div className="relative w-full h-full pb-96">
            <Link href={'/'} className="flex flex-row justify-center border-b-2 border-gray-100 dark:border-black">
                <Image src={logo} alt="logo" width={80} height={80} className="rounded-full my-2" />
            </Link>
            <div className="flex flex-col w-full h-full justify-center">
                {
                    chatHistory.map((chatItem) => {
                        if (chatItem['role'] == ROLE_BOT) {
                            return (
                                <div key={chatItem['id']} className="px-6 lg:px-56 py-2 bg-slate-50 dark:bg-slate-700">
                                    <Image className="float-left rounded-full" src={logo} alt="logo" width={50} height={50} />

                                    <div className="flex flex-col px-5 py-3 ml-3">
                                        <div className="text-york_blue mb-2 dark:text-white">
                                            {chatItem['content']}
                                        </div>
                                        <div className="text-gray-400 font-light text-sm dark:text-white">
                                            {formateTime(chatItem['time'])}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={chatItem['id']} className="px-6 lg:px-56 py-2 ">
                                    <Image className="float-left rounded-full p-2" src={user} alt="logo" width={50} height={50} />
                                    <div className="flex flex-col px-5 py-3 ml-3">
                                        <div className="text-york_blue mb-2 dark:text-white">
                                            {chatItem['content']}
                                        </div>
                                        <div className="text-gray-400 font-light text-sm dark:text-white">
                                            {formateTime(chatItem['time'])}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    )
                }
            </div>


            <div className="fixed bottom-0 w-full py-10 border-t-2 border-gray-100 dark:border-black px-3 lg:px-56 bg-white dark:bg-slate-800">
                <div className="flex flex-row my-3">
                    <div className="flex-1 ">
                        <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="visible md:hidden h-10 border-gray-400 border-0.5 rounded-full dark:text-gray-200 dark:bg-gray-500 bg-gray-50 w-full pl-7 text-york_blue" placeholder="" />

                        <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="md:visible md:block hidden h-10 border-gray-400 border-0.5 dark:text-gray-200 rounded-full dark:bg-gray-500 bg-gray-50 w-full pl-7 text-york_blue" placeholder="Enter your preferences" />
                    </div>
                    <button className="hidden md:block  content-center rounded-md h-10 w-32  ml-3 dark:bg-gray-500 dark:text-gray-300 border-gray-300 border-1 text-gray-600 font-bold" onClick={() => { handleQuery(inputValue) }}>
                        send chat
                    </button>
                    <button className="visited: md:hidden ml-2 content-center rounded-md dark:bg-gray-500 dark:text-gray-300 border-gray-300 border-1 text-gray-600 h-10 w-16 text-center font-bold" onClick={() => { handleQuery(inputValue) }}>
                        chat
                    </button>
                    <button onClick={clearChat} className="hidden md:block content-center bg-gray-100 rounded-md h-10 w-32 dark:bg-gray-500 border-1 dark:text-gray-300 text-york_blue ml-3 text-center font-bold">
                        clear chat
                    </button>
                </div>
            </div>
        </div>

    )
}