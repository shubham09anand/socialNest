import React, { useState } from 'react'
import API from '../../Services/API';

const AIchat = () => {

     const [aiInput, setAiInput] = useState();
     const [status, setStatus] = useState(false);
     const [button, setButton] = useState(false);

     // process to handle ai 
     const aiData = () => {
          if (aiInput === "" || aiInput.trim() === "") {
               alert("filed empty")
               return false;
          };
          setStatus(true);
          setButton(true);

          API.get(`/aiResponse?userInput=${aiInput}`)
               .then((res) => {
                    setAiInput(res.data.generatedText);
                    setStatus(false);
                    setButton(false);
               })
               .catch((error) => {
                    console.error("Error fetching AI response:", error);
                    setAiInput("Please Try Again Something Went Wrong !!!")
                    setStatus(false);
               }).finally(() => {
                    setButton(false);
               });
     };

     return (
          <div className={`w-[95%] flex space-x-2 h-fit px-2 place-content-center items-center rounded-md ${status ? 'animate-pulse' : ''}`}>
               <textarea onChange={(e) => { setAiInput(e.target.value) }} value={aiInput} type="text" placeholder="Ask Ai....." className="border focus:border-[#5371b7] focus:bg-slate-200 bg-[#e5e7eb] placeholder:font-bold placeholder:text-gray-600 rounded-full mt-1.5 max-h-32 w-full block mx-auto pl-4 pt-1 h-12 resize-none outline-none example text-gray-500 focus:text-gray-600" name="message" />
               <button disabled={button} onClick={aiData} title='Ask Ai' className='outline-none bg-[#3a5fb4] px-2.5 py-2.5 rounded-full relative text-white font-semibold'>
                    Ask
               </button>
          </div>
     )
}

export default AIchat