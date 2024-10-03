import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const UpdatePassword = () => {

     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [button, setButton] = useState(false);

     const handleSubmit = () => {
          const trimmedPassword = password ? password.trim() : '';
          const trimmedConfirmPassword = confirmPassword ? confirmPassword.trim() : '';
          
          if (trimmedPassword && trimmedConfirmPassword) {
               if (trimmedPassword === trimmedConfirmPassword) {
                    if (trimmedPassword.length >= 8) {
                         setButton(true);
                         API.post('/updatePassword', { userId: userId, newPassword: trimmedPassword })
                              .then((req,_) => {
                                   if (req.data?.status === 1) {
                                        toast.success("Password Updated");
                                        setPassword('');
                                        setConfirmPassword('');
                                        setButton(false);
                                   }
                                   else if (req.data?.status === 2) {
                                        toast.info("New password must be different from the current password");
                                        setButton(false);
                                   }
                              })
                              .catch((_) => {
                                   toast.warning("Something went wrong");
                              }).finally(()=>{
                                        setButton(false);
                              })
                    } else {
                         toast.warning("Password should contain at least 8 characters");
                    }
               } else {
                    toast.warning("Password and Confirm Password should match");
               }
          } else {
               toast.warning("Password and Confirm Password Required");
          }
     };


     return (
          <div>
               <ToastContainer />
               <section className="w-full lg:w-[80%] lg:p-2 lg:absolute right-0 pt-[35px] lg:pt-[30px]">
                    <div className="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-screen lg:py-0">
                         <div className="w-full p-6 bg-white rounded-lg md:shadow-inner md:mt-0 sm:max-w-md sm:p-8">
                              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                                   Change Password
                              </h2>
                              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                   <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                   </div>
                                   <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="text" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                   </div>
                                   <button disabled={button} onClick={handleSubmit} type="button" className={`w-full text-white bg-[#6f90e2] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}> {button ? 'Updating' : 'Reset password'}</button>
                              </form>
                         </div>
                    </div>
               </section>
          </div>
     );
};

export default UpdatePassword;
