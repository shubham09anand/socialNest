import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import Intro from "./Intro";
import API from "../../Services/API";
import socialNest from '../../Assets/images/socialNest.png';

const Signup = () => {

     useEffect(() => {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userId');
     }, []);

     const navigate = useNavigate();
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [userName, setuserName] = useState("");
     const [password, setPassword] = useState("");
     const [warnDisplay, setwarnDisplay] = useState(false);
     const [button, setButton] = useState(false);

     useEffect(() => {
          const restrictedUsernames = ['shubham09anand', 'shubham', 'anand', '@shubham09anand', '@shubham', '@anand'];
          if (restrictedUsernames.includes(userName.toLowerCase())) {
               setwarnDisplay(true);
          } else {
               setwarnDisplay(false);
          }
     }, [userName]);

     const handleSubmit = (e) => {
          e.preventDefault();
          setButton(true); 

          if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
               setButton(false);
               toast.warning("Password should be at least 8 characters long and contain at least one special character.");
               return;
          }

          if (warnDisplay) {
               toast.error("Username not allowed. Please choose another one.");
               setButton(false);
               return;
          }

          API.post("/signup", {
               firstName,
               lastName,
               userName,
               password,
          }).then((res) => {
               if (res.data?.message === true) {
                    setFirstName("");
                    setLastName("");
                    setuserName("");
                    setPassword("");
                    toast.success("You have successfully signed up! Redirecting to login...");
                    setTimeout(() => {
                         navigate('/');
                    }, 3000);
               } else {
                    toast.error("Signup failed. Please try again.");
               }
          }).catch((error) => {
               console.error('Signup error:', error);
               toast.error("An error occurred during signup.");
          }).finally(() => {
               setButton(false); 
          });
     };

     return (
          <div className="h-screen bg-[#f1f5f9]">
               <ToastContainer style={{ fontSize: "12px" }} />
               <div className="pt-20 lg:pt-0 flex-row lg:flex justify-center items-center h-screen w-full md:px-20 lg:px-20 xl:px-60 md:space-x-10">
                    <Intro height={500} />
                    <img src={socialNest} alt="socialNest" className="w-20 h-20 mx-auto mb-2 lg:hidden" />
                    <div className="bg-white p-5 w-full sm:w-3/4 lg:w-full h-fit shadow-2xl">
                         <h1 className="text-2xl font-semibold mb-2">Signup</h1>
                         <form onSubmit={handleSubmit} className="w-full mx-auto h-full place-content-center items-center flex-col">
                              <div className="sm:flex sm:flex-col justify-between">
                                   <div className="mb-2 w-full">
                                        <label htmlFor="firstName" className="block text-gray-600">First Name</label>
                                        <input required placeholder="First Name" type="text" className="w-full border-2 border-[#4f74d4] focus:border-[#032478] rounded-md py-2 px-3 focus:outline-none" autoComplete="off" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                   </div>
                                   <div className="mb-2 w-full">
                                        <label htmlFor="lastName" className="block text-gray-600">Last Name</label>
                                        <input required placeholder="Last Name" type="text" className="w-full border-2 border-[#4f74d4] focus:border-[#032478] rounded-md py-2 px-3 focus:outline-none" autoComplete="off" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                   </div>
                              </div>
                              <div className="mb-2">
                                   <label htmlFor="userName" className="block text-gray-600">Username</label>
                                   <input required placeholder="Enter a username" type="text" className="w-full border-2 border-[#4f74d4] focus:border-[#032478] rounded-md py-2 px-3 focus:outline-none" autoComplete="off" value={userName} onChange={(e) => setuserName(e.target.value)} />
                                   {warnDisplay && (<div className="text-red-600 text-[12px] italic">Username is restricted, please choose another one.</div>)}
                              </div>
                              <div className="mb-2">
                                   <label htmlFor="password" className="block text-gray-600">Password</label>
                                   <input required placeholder="Enter a password" type="password" id="password" className="w-full border-2 border-[#4f74d4] focus:border-[#032478] rounded-md py-2 px-3 focus:outline-none" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </div>
                              <button type="submit" disabled={button} className={`mt-2 bg-[#7090e3] text-white font-semibold rounded-sm py-2 px-4 w-full ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                   {button ? 'Signing Up...' : 'Sign Up'}
                              </button>
                         </form>
                         <div className="mt-3 text-blue-500 text-center">
                              <Link to="/" className="hover:underline">
                                   Already Have An Account? Login Here
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Signup;
