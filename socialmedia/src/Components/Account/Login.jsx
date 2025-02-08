import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoginData } from "../../Features/Counter/LoginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import socialNest from '../../Assets/images/socialNest.png';
import Intro from "./Intro";
import API from "../../Services/API";

const Login = () => {

     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [userName, setUserName] = useState('');
     const [userPassword, setUserPassword] = useState('');
     const [userLoginDetails, setUserLoginDetails] = useState(null);
     const [button, setButton] = useState(false);

     window.onload = function () {
          if (localStorage.getItem('userToken')) {
               localStorage.removeItem('userToken');
          }
          if (localStorage.getItem('userId')) {
               localStorage.removeItem('userId');
          }
     };

     // login function
     const handleLogin = async (e) => {
          setButton(true);
          e.preventDefault();
          try {
               const response = await API.post("/login", { userName, password: userPassword });
               setUserLoginDetails(response.data);
               if (response.data.success === false) {
                    toast.error("Invalid Credentials");
               }
          } catch (error) {
               toast.warning("Something Went Wrong");
          } finally{
               setButton(false)
          }
     };

     useEffect(() => {
          if (userLoginDetails === null) {
               return;
          }
          if (userLoginDetails && userLoginDetails.success === true && userLoginDetails.token !== null) {
               dispatch(setLoginData({ token: userLoginDetails.token, userId: userLoginDetails.userData._id }));

               localStorage.setItem('userId', userLoginDetails.userData._id);
               localStorage.setItem('userToken', userLoginDetails.token);
               navigate('/home');

          }
     }, [userLoginDetails, navigate, dispatch]);

     return (
          <form className="w-full bg-slate-100 h-screen" onSubmit={handleLogin} >
               <ToastContainer />
               <div className="h-full w-full mx-auto pt-20 lg:pt-28">
                    <div className="mx-auto">
                         <div className="flex-col lg:flex-row justify-center place-content-center items-center md:p-0 md:px-6 lg:px-2 xl:px-10">
                         <img src={socialNest} alt="socialNest" className="w-20 h-20 mx-auto mb-2 lg:hidden" />
                              <div className="w-full flex mx-auto place-content-center items-center md:px-10 lg:px-10 xl:px-40 md:gap-x-20">
                                   <Intro />
                                   <div className={`w-full mx-auto shadow-2xl h-full place-content-center items-center flex`}>
                                        <div className={`w-full h-full bg-white sm:p-5 rounded-lg`}>
                                             <h3 className="py-4 text-3xl text-center font-semibold w-full text-gray-800">
                                                  Sign In
                                             </h3>
                                             <div className="px-8 pb-8 mb-4 bg-white rounded">
                                                  <div className="mb-4 md:flex md:justify-between"></div>
                                                  <div className="mb-4">
                                                       <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="User Name">
                                                            User Name
                                                       </label>
                                                       <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none outline-none border-[#5070c9] border-2 focus:border-[#132d74]" id="userName" type="userName" name="userName" placeholder="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                                                  </div>
                                                  <div className="mb-4 md:flex md:justify-between">
                                                       <div className="mb-4 md:mr-2 md:mb-0 w-full">
                                                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                                                 Password
                                                            </label>
                                                            <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 rounded shadow appearance-none outline-none border-[#5070c9] border-2 focus:border-[#132d74]" id="password" type="password" name="password" placeholder="******************" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
                                                       </div>
                                                  </div>
                                                  <div className="mb-6 text-center bg-[#4f74d4] hover:bg-[#2f5ed5] rounded-full">
                                                       <button className={`w-full px-4 py-2 font-bold text-white rounded-full ${button ? 'opacity-5 cursor-wait animate-pulse' : 'cursor-pointer'}`} type="">
                                                            Login Account
                                                       </button>
                                                  </div>
                                                  <hr className="mb-6 border-t" />
                                                  <div className="text-center">
                                                       <div className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                                            <NavLink to='/signup' style={{ textDecoration: "none" }}>Don't have a account. Sign Up</NavLink>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </form>
     );
};

export default Login;