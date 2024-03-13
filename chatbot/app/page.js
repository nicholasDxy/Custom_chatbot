'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";






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
    // console.log('value is:', event.target.value);
  }

  const getFilds = () =>{
    const filedom = document.getElementById('file');

    filedom.click()
  }
  
  const fileinputChange = (event) =>{
    const fileData = event.target.files[0];
    console.log(event.target.files)
    fetchData(fileData)
  }

  async function fetchData(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/pdfHandler',{
        method:"post",
        body:formData
    });
    console.log(response.json())
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
            <Link href={{ pathname: '/chat', query: { 'question': inputValue } }}>
              <button className="content-center rounded-md h-10 hidden md:visible md:block w-40 bg-gray-200 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-york_blue ">
                start chatting
              </button>
              <button className="content-center rounded-md h-10 visible w-16 md:hidden  bg-gray-200 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-york_blue ">
                chat
              </button>
            </Link>
          </div>

        </div>
        <div>
        <input id="file" type="file" accept=".pdf"
         	style={{ display:"none", }}
         	onChange={fileinputChange}
        />
        <button onClick={getFilds}>upload pdf</button>
      </div>
      </div>

    </main>
  )
}
