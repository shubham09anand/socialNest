import React, { useState } from 'react'
import API from '../../Services/API';

const AIchat = () => {

     const [aiInput, setAiInput] = useState();
     const [status, setStatus] = useState(false);
     const [button, setButton] = useState(false);

     // process to handle ai 
     const aiData = () => {
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
          <div className={`w-[95%] mb-2 p-2 mx-auto flex space-x-2 h-fit px-2 place-content-center items-center shadow-md rounded-md ${status ? 'animate-pulse' : ''}`}>
               <textarea onChange={(e) => { setAiInput(e.target.value) }} value={aiInput} type="text" placeholder="Ask Ai..." className="border focus:border-[#5371b7] focus:bg-slate-200 rounded-full mt-1.5 max-h-32 w-full block mx-auto pl-2 pt-1 h-full resize-none outline-none example bg-slate-50 text-gray-500 focus:text-gray-600" name="message" />
               <button disabled={button} onClick={aiData} title='Ask Ai' className='outline-none bg-[#5371b7] px-4 py-1 rounded-md relative text-white font-semibold'>
                    Ask
               </button>
          </div>
     )
}

export default AIchat