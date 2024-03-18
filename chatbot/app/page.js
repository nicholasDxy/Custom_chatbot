'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Uploader } from "./component/uploader";
import Select from 'react-select';
import { BASE_URL } from "./util/Config";
import { MultiSelect } from "react-multi-select-component";


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const cache = useRef(false);
  

  useEffect(() => {
    if (!cache.current) {
      getFileList()
      cache.current = true
    }
  }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  async function getFileList() {
    await fetch(`${BASE_URL}/files/`,{
      method:"get"
  }).then((response) => response.json())
  .then((data) => {
    console.log('getFileList:', data)
    let fileOption = []
    data.forEach(element => {
      fileOption.push({ value: element, label: element })
    });
    console.log(fileOption)
    setOptions(fileOption)
  })
  .catch((error) => console.error('Error deleting object:', error));
  }

  return (
    <main className="items-center font-LexendRegular dark:bg-slate-800">
      <div className="flex flex-col items-center justify-center">
        {/* <Image src={logo} alt="logo" width={220} height={220} className="mt-20 rounded-full" /> */}

        <div className="mt-10 font-LexendBold font-black text-2xl lg:text-4xl text-center my-3 text-york_blue dark:text-white">
           CHAT PDF
        </div>
        <div className="w-full lg:px-40 px-5 py-5">
          <div className="flex flex-row my-3">
            <div className="flex-1 ">
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="visible md:hidden h-10 border-gray-400 border-0.5 rounded-full bg-gray-100 dark:bg-gray-500 w-full pl-7 text-york_blue dark:text-gray-200" placeholder="" />
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="hidden md:visible md:block h-10 border-gray-400 border-0.5 rounded-full dark:bg-gray-500 bg-gray-100 w-full pl-7 text-york_blue dark:text-gray-200" placeholder="Input your question" />
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
        <Uploader/>
        <MultiSelect className="mt-5 w-2/3"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      </div>

    </main>
  )
}
