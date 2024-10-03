import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../../Services/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MakeComment = ({ postId }) => {

     const commenterId = useSelector((state) => (state.LoginSlice.loggedUserId));
     const [Comment, setComment] = useState();
     const [button, setButton] = useState(false)

     const hanldeComments = (e, postId) => {
          e.preventDefault();
          setButton(true)
          API.post("/makeComment", { postId: postId, commenterId: commenterId, commentBody: Comment }).then((req, _) => {
               if (req.data.status === 1) {
                    toast.success("Comment posted successfully!");
                    setComment("");
                    setButton(false);
               }
          }).catch(() => {
               toast.error("Failed to post comment. Please try again.");
               setButton(false);
          }).finally(()=>{
               setButton(false);
          })
     }

     return (
          <>
               <ToastContainer/>
               <form onSubmit={(e) => hanldeComments(e, postId)} className="sm:py-3 py-2.5 border-t border-gray-100 flex items-center gap-1">
                    <div className="flex-1 relative overflow-hidden h-10">
                         <textarea maxLength={100} required value={Comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Add Comment (max 100 words)" rows="1" className="w-full resize-none  px-4 py-2 focus:bg-gray-200 focus:!border-transparent focus:!ring-transparent bg-gray-100 rounded-2xl outline-none"></textarea>
                    </div>

                    <button disabled={button} type="submit" className={`text-sm rounded-full py-1.5 px-3.5 bg-secondery active:opacity-70 ${button ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="#5771b5" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                         </svg>
                    </button>
               </form>
          </>

     )
}

export default React.memo(MakeComment)