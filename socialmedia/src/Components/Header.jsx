import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import noProfilePicture from '../Assets/NoProileImage.png';
import HeaderAnimation from "./Animation/HeaderAnimation";
import socialNest from '../Assets/images/socialNest.png';
import API from "../Services/API";
import Deveplores from "./Deveplores";

const Header = ({ toggleDashboard, userPhoto }) => {

    const location = useLocation();
    const currPath = location.pathname;
    const [isHeaderLoading, setIsHeaderLoading] = useState(true);
    const logedin_user_Id = useSelector((state) => state.LoginSlice.loggedUserId);
    const [userInput, setUserInput] = useState("");
    const [users, setUsers] = useState({ filterData: [] });
    const [displayLowerSearch, setDisplayLowerSearch] = useState(false);
    const [displayValue, setDisplayValue] = useState(null)
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [hamburgerDisplay, setHamburgerDisplay] = useState(false)

    const debounceTimeoutRef = useRef(null);

    const debounce = (func, delay) => {
        return (...args) => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchFilteredUsers = useCallback((userInput) => {
        API.post("/filterUser", { userInput })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.log("Error fetching users:", error);
            });
    }, []);

    const debouncedFetchFilteredUsers = useCallback(debounce(fetchFilteredUsers, 500), [fetchFilteredUsers]);

    useEffect(() => {
        if (userInput !== "") {
            debouncedFetchFilteredUsers(userInput);
        } else {
            setUsers({ filterData: [] });
        }
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [userInput, debouncedFetchFilteredUsers]);

    useEffect(() => {
        setTimeout(() => {
            setIsHeaderLoading(false);
        }, 1000);
    }, []);

    const handleDashboardDisplay = () => {
        hamburgerDisplay ? setHamburgerDisplay(false) : setHamburgerDisplay(true)
        toggleDashboard();
    };

    const handleLowerSearch = () => {
        displayLowerSearch ? setDisplayLowerSearch(false) : setDisplayLowerSearch(true)
        setDisplayValue(0);
    }

    return (
        <>
            {isHeaderLoading ? (
                <HeaderAnimation />
            ) : (
                <header className="lg:px-2 fixed w-screen bottom-0 lg:top-0 lg:bottom-[100%] bg-white z-40">
                    <div className="flex py-1 justify-between border-t-2 w-full pr-2 lg:px-6 lg:gap-5 space-x-2 place-content-center items-center bg-white">
                        <div className={` lg:hidden w-fit flex items-center gap-1 ${logedin_user_Id === null ? 'hidden' : 'block'}`}>
                            {true && (
                                <button onClick={handleDashboardDisplay} className={`${logedin_user_Id === null ? 'hidden' : `${!hamburgerDisplay ? 'bg-white' : 'bg-[#1e409f] p-1.5 border-solid'} flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100`}`} aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={`${!hamburgerDisplay ? 'black' : 'white'}`} className="w-6 h-6  outline-none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className={`${logedin_user_Id === null ? 'pl-4 sm:pl-3 lg:-translate-x-8 w-full' : 'hidden lg:block'}`}>
                            <div className={`flex place-content-center items-center justify-between -translate-x-5 ${logedin_user_Id === null ? "w-screen" : "w-full"}`}>
                                <div className="flex space-x-2 place-content-center items-center">
                                    <img src={socialNest} draggable={false} className="h-10 w-10 select-none" alt="Social Nest Logo" />
                                    <div className={`${logedin_user_Id === null ? '' : 'select-none text-base font-extrabold hidden lg:block'}`}>Social<span className="text-[#6e8de0]">Nest</span></div>
                                </div>
                                {logedin_user_Id === null && (<Deveplores />)}
                            </div>
                        </div>

                        {currPath !== '/' && (
                            <>
                                <div className="lg:w-full rounded-lg">
                                    <div className="lg:mx-auto lg:w-full lg:rounded-md">
                                        {logedin_user_Id !== null && (
                                            <>
                                                <svg onClick={handleLowerSearch} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="-translate-x-5 lg:translate-x-0 cursor-pointer absolute top-2.5 lg:top-4 lg:ml-3 w-7 h-7 lg:w-6 lg:h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                                <input onFocus={() => setIsInputFocused(true)} onBlur={() => setTimeout(() => setIsInputFocused(false), 1000)} onChange={(e) => setUserInput(e.target.value)} value={userInput} type="text" placeholder="Search People" className="hidden lg:block bg-gray-50 rounded-md text-gray-500 pl-12 w-full h-fit outline-none font-medium py-2 placeholder:font-bold text-lg" />
                                            </>
                                        )}
                                        {userInput !== "" && isInputFocused && (
                                            <nav className={`hidden h-[1000px] overflow-y-scroll lg:block absolute z-50 w-screen top-12 left-0 text-sm font-medium text-black backdrop-blur-xl border-t`}>
                                                {users.filterData && users.filterData.length > 0 ? (
                                                    users.filterData.filter(user => user?._id !== logedin_user_Id).map((user) => (
                                                        <Link style={{ textDecoration: "none" }} to={`/searched-person/${user?._id}`} key={user?._id} className="mt-2 cursor-pointer hover:bg-white relative px-3 py-1.5 flex items-center gap-4">
                                                            {user?.searchedPersonProfile[0]?.profilePhoto ? (
                                                                <img src={user?.searchedPersonProfile[0]?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} className="w-9 h-9 rounded-full object-contain border-black" alt={`Avatar of ${user?.firstName} ${user?.lastName}`} style={{ border: "2px solid black" }} />
                                                            ) :
                                                                <img src={noProfilePicture} onError={(e) => e.target.src = noProfilePicture} className="w-9 h-9 rounded-full object-contain border-black" alt={`Avatar of ${user?.firstName} ${user?.lastName}`} style={{ border: "2px solid black" }} />
                                                            }
                                                            <div>
                                                                <div style={{ color: 'black' }} className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
                                                                <div className="text-blue-500 text-xs">{`${user?.userName}`}</div>
                                                            </div>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-2 text-gray-500">No User Found</div>
                                                )}
                                            </nav>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {currPath !== '/' && (
                            <>
                                {logedin_user_Id !== null && (
                                    <Link onClick={() => setDisplayValue(null)} to='/create-post'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="black" className="w-7 h-7 cursor-pointer active:opacity-80">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Link>
                                )}
                            </>
                        )}

                        {currPath !== '/' && (
                            <>
                                {logedin_user_Id !== null && (
                                    <Link onClick={() => setDisplayValue(null)} to='/create-story' className="border-dashed border-2 border-black rounded-full w-fit h-fit active:opacity-60 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="black" className="w-6 h-6 p-1 hover:border-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </Link>
                                )}
                            </>
                        )}

                        {currPath !== '/' && (
                            <>
                                {logedin_user_Id !== null && (
                                    <Link onClick={() => setDisplayValue(null)} to={`/searched-person/${logedin_user_Id}`} className="rounded-full relative bg-secondery cursor-pointer shrink-0" tabIndex="0" aria-haspopup="true" aria-expanded="false">
                                        {userPhoto?.user?.profilePhoto ? (
                                            <img src={userPhoto.user?.profilePhoto || noProfilePicture} alt="" onError={(e) => e.target.src = noProfilePicture} className="sm:w-10 sm:h-10 w-10 h-10 object-cover rounded-full shadow shrink-0" style={{ border: "2px black solid" }} />
                                        ) : (
                                            <img src={noProfilePicture} alt="imgErr" className="sm:w-10 sm:h-10 w-10 h-10 object-cover rounded-full shadow shrink-0" />
                                        )}
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </header>
            )}

            {displayValue === 0 && displayLowerSearch && (
                <div className={`absolute z-20 lg:top-0 lg:bottom-[80%] h-[500%] w-full p-2 bg-white`}>

                    <div className="relative w-full">
                        <input onFocus={() => setIsInputFocused(true)} onBlur={() => setTimeout(() => setIsInputFocused(false), 1000)} onChange={(e) => setUserInput(e.target.value)} value={userInput} type="text" placeholder="Search People" className="bg-gray-100 rounded-md text-gray-500 pl-12 w-full h-fit outline-none font-medium py-2 placeholder:font-bold" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="absolute top-2 left-2 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>

                    {isInputFocused && (
                        <nav className={`w-full h-full text-sm font-medium text-black bg-white`}>
                            {userInput !== "" && users.filterData && users.filterData.length > 0 ? (
                                users.filterData.filter(user => user?._id !== logedin_user_Id).map((user) => (
                                    <Link onClick={handleLowerSearch} style={{ textDecoration: "none" }} to={`/searched-person/${user?._id}`} key={user?._id} className="mt-2 cursor-pointer hover:bg-white relative py-1.5 border-b flex items-center gap-4">
                                        {user?.searchedPersonProfile[0]?.profilePhoto ? (
                                            <img src={user?.searchedPersonProfile[0]?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} className="w-9 h-9 rounded-full object-contain border-[#5670b2]" alt={`Avatar of ${user?.firstName} ${user?.lastName}`} style={{ border: "2px solid #6f8fe2" }} />
                                        ) :
                                            <img src={noProfilePicture} onError={(e) => e.target.src = noProfilePicture} className="w-9 h-9 rounded-full" alt={`Avatar of ${user?.firstName} ${user?.lastName}`} style={{ border: "2px solid black" }} />
                                        }
                                        <div>
                                            <div style={{ color: 'black' }} className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
                                            <div className="text-blue-500 text-xs">{`${user?.userName}`}</div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-2 text-gray-500">No User Found</div>
                            )}
                        </nav>
                    )}
                </div>
            )}
        </>
    );
}

export default Header;