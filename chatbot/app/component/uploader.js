'use client'
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../util/Config";

export const Uploader = ({ updateFileInfo }) => {
    const defaultBtnValue = 'upload file'
    const [btnValue, setBtnValue] = useState(defaultBtnValue);
    const getFields = () => {
        const filedom = document.getElementById('file');
        filedom.click()
    }

    const fileinputChange = (event) => {
        const fileData = event.target.files[0];
        console.log(event.target.files)
        handlePDF(fileData)
    }
    async function handlePDF(file) {
        const formData = new FormData();
        formData.append('file', file);
        setBtnValue('Loading...')
        await fetch(`${BASE_URL}/uploadpdf/`, {
            method: "post",
            body: formData
        }).then((res) => res.json())
            .then((data) => {
                setBtnValue(defaultBtnValue)
                console.log('handleQuery:', data)
                updateFileInfo(data.name, data.uid)
            })
            .catch((error) => {
                setBtnValue('Error!')
                console.error('Error deleting object:', error)
            });

    }

    return (
        <div className="font-LexendBold w-full flex flex-row justify-center">
            <input id="file" type="file" accept=".pdf"
                style={{ display: "none", }}
                onChange={fileinputChange}
            />
            <button className="w-2/3 h-32 my-5 md:h-56 text-gray-600 rounded-xl md:text-3xl text-xl border-gray-300 border-2" onClick={getFields}>{btnValue}</button>
        </div>
    )
}