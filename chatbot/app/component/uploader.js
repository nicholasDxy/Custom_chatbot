import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../util/Config";

export const Uploader = () =>{
    const defaultBtnValue = 'upload file'
    const [btnValue, setBtnValue] = useState(defaultBtnValue);
    const getFilds = () =>{
        const filedom = document.getElementById('file');
        filedom.click()
      }
      
      const fileinputChange = (event) =>{
        const fileData = event.target.files[0];
        console.log(event.target.files)
        handlePDF(fileData)
      }
    async function handlePDF(file) {
        const formData = new FormData();
        formData.append('file', file);
        setBtnValue('Loading...')
        await fetch(`${BASE_URL}/uploadpdf/`,{
            method:"post",
            body:formData
        }).then((res) => res.json())
        .then((data) => {
            setBtnValue(defaultBtnValue)
            console.log('handleQuery:', data)
          })
          .catch((error) => {
            setBtnValue('Error!')
            console.error('Error deleting object:', error)});
    
      }
    
    return (
        <div>
        <input id="file" type="file" accept=".pdf"
         	style={{ display:"none", }}
         	onChange={fileinputChange}
        />
        <button onClick={getFilds}>{btnValue}</button>
      </div>
    )
}