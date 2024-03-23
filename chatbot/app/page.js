'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/chatbot_logo.png"
import Link from "next/link";
import { Uploader } from "./component/uploader";
import Select from 'react-select';
import { BASE_URL } from "./util/Config";


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const cache = useRef(false);
  const uid = useRef("");


  useEffect(() => {
    if (!cache.current) {
      getFileList()
      cache.current = true
    }
  }, [])

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }
  function updateFileInfo(fileName, fileUid) {
    console.log('updateFileInfo:', fileName, fileUid)
    setOptions((options) => [...options, { 'value': fileUid, 'label': fileName }])
    setSelectedOption({ 'value': fileUid, 'label': fileName })
    console.log(selectedOption)
  }

  async function getFileList() {
    await fetch(`${BASE_URL}/files/`, {
      method: "get"
    }).then((response) => response.json())
      .then((data) => {
        console.log('getFileList:', data)
        let fileOption = []
        data.forEach(element => {
          fileOption.push({ value: element.uid, label: element.file_name })
        });
        console.log(fileOption)
        setOptions((op) => [...op, ...fileOption])
      })
      .catch((error) => console.error('Error deleting object:', error));
  }

  function handleClick() {
    console.log('selectedOption:', selectedOption)
  }

  return (
    <main className="min-h-screen  h-full items-center font-LexendRegular dark:bg-slate-800">
      <div className="LexendRegular flex flex-col items-center justify-center">
        <div className="mt-10 font-LexendBold font-black text-4xl lg:text-4xl text-center my-3 text-york_blue dark:text-white">
          CHAT PDF
        </div>
        <Image src={logo} alt="logo" width={200} height={200} className="mt-5 object-contain rounded-full" />
        <div className="w-full lg:px-40 px-5 py-5">
          <div className="flex flex-row my-3">
            <div className="flex-1 ">
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="visible md:hidden h-10 border-gray-400 border-1 rounded-full bg-transparent dark:bg-gray-500 w-full pl-7 text-york_blue dark:text-gray-200" placeholder="" />
              <input value={inputValue} onChange={handleInputChange} name="input" type="text" className="hidden md:visible md:block h-10 border-gray-400 border-1 rounded-full dark:bg-gray-500 bg-transparent w-full pl-7 text-york_blue dark:text-gray-200" placeholder="Input your question" />
            </div>
            <Link onClick={handleClick} href={{ pathname: '/chat', query: { 'question': inputValue, 'data': selectedOption != null ? selectedOption.value : '' } }}>
              <button className="content-center rounded-md h-10 hidden md:visible md:block w-40 border-gray-500 border-2 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-gray-600 ">
                start chatting
              </button>
              <button className="content-center rounded-md h-10 visible w-16 md:hidden  border-gray-500 border-2 dark:bg-slate-600 dark:text-gray-300 ml-3 text-center text-gray-600 ">
                chat
              </button>
            </Link>
          </div>

        </div>
        <Uploader updateFileInfo={updateFileInfo} />
        <Select className="mt-5 bg-transparent w-2/3"
          value={selectedOption}
          onChange={setSelectedOption}
          options={options} />
      </div>

    </main>
  )
}
