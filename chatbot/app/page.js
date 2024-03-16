'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Uploader } from "./component/uploader";
import { BASE_URL } from "./util/Config";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const cache = useRef(false);
  

  useEffect(() => {
    if (!cache.current) {

      cache.current = true
    }
  }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
  })
  .catch((error) => console.error('Error deleting object:', error));
  }


  return (
    <main className="items-center font-LexendRegular dark:bg-slate-800">
      <div className="flex flex-col items-center justify-center">
        {/* <Image src={logo} alt="logo" width={220} height={220} className="mt-20 rounded-full" /> */}

        <div className="font-LexendBold font-black text-2xl lg:text-4xl text-center my-3 text-york_blue dark:text-white">
           GPT
        </div>
        <div className="font-LexendLight text-lg lg:text-2xl text-center mt-1 mb-5 text-gray-500 dark:text-gray-200">
           Bot
        </div>
        <div className="w-full lg:px-40 px-5 py-5">
          <div className="flex flex-row my-3">
            <div className="flex-1 ">
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="visible md:hidden h-10 border-gray-400 border-0.5 rounded-full bg-gray-100 dark:bg-gray-500 w-full pl-7 text-york_blue dark:text-gray-200" placeholder="" />
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="hidden md:visible md:block h-10 border-gray-400 border-0.5 rounded-full dark:bg-gray-500 bg-gray-100 w-full pl-7 text-york_blue dark:text-gray-200" placeholder="Enter your preferences" />
            </div>
            {/* <Link href={{ pathname: '/chat', query: { 'question': inputValue } }}> */}
              <button onClick={()=>handleQuery(inputValue)} className="content-center rounded-md h-10 hidden md:visible md:block w-40 bg-gray-200 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-york_blue ">
                start chatting
              </button>
              <button className="content-center rounded-md h-10 visible w-16 md:hidden  bg-gray-200 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-york_blue ">
                chat
              </button>
            {/* </Link> */}
          </div>

        </div>
        <Uploader></Uploader>
      </div>

    </main>
  )
}
