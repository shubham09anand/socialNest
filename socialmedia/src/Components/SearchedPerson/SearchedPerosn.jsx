import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../../Features/Counter/LoginSlice';
import noProfilePicture from '../../Assets/NoProileImage.png';
import UserProfile from '../Profile/UserProfile';
import SearchedPersonPost from './searchedPersonPost';
import CheckFriendStatus from './CheckFriendStatus';
import API from '../../Services/API';

const SearchedPerson = () => {

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => (state.LoginSlice.loggedUserId));
  const { searchedUserId } = useParams();
  const [ListDisplay, setListDisplay] = useState(0);
  const [info, setInfo] = useState(null);
  const [UserData, setUserData] = useState({});

  const toggleListDisplay = (value) => {
    setListDisplay(value);
  };

  useEffect(() => {
    if (searchedUserId) {
      API.post("/getUserProfile", { userId: searchedUserId }).then((res) => {
        setUserData(res.data);
      })
        .catch((error) => {
          navigator('*')
          console.error('Error fetching user profile');
        });
    }
  }, [searchedUserId,navigator]);

  //getting user frined and post count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.post("/userDetails", { userId: searchedUserId });
        setInfo(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [searchedUserId]);

  const userToken = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userToken && userId) {
      dispatch(setLoginData({ token: userToken, userId: userId }));
    }
  },[userToken, userId,dispatch])

  return (
    <>
      <div className={`${loggedUser === null ? 'pb-20 h-screen w-full' : 'pb-20 lg:absolute right-0  w-full lg:w-[80%] lg:p-5'}`}>
        <div className="w-full bg-white lg:rounded-b-2xl lg:-mt-10">
          <div className="relative overflow-hidden w-full lg:h-72 h-48">
            {UserData?.userProfile2?.backGroundPhoto || UserData?.userProfile2?.backGroundPhoto === "" ?
              <img src={UserData?.userProfile2?.backGroundPhoto} alt="backgroundPicture" className="h-full w-full object-fill" />
              :
              <div className='bg-gradient-to-br from-sky-200 via-sky-300 to-sky-700 h-full w-full'></div>
            }
          </div>
          <div className="px-3">
            <div className="flex flex-col justify-center md:items-center lg:-mt-32 sm:-mt-16 -mt-20">
              <div className="relative z-10">
                <div className="mx-auto relative overflow-hidden rounded-full mt-3 h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 md:border-[6px] border-gray-900 shrink-0 shadow">
                  {UserData?.userProfile2 ? <img src={UserData?.userProfile2?.profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="imgErr" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-cover inset-0 rounded-full " style={{border : '2px solid black'}} /> : <img src={noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="imgErr" className="h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48 object-cover inset-0 rounded-full" style={{border : '2px solid black'}}/>}
                </div>
              </div>
            </div>

            {UserData?.userProfile1 ? (
              <>
                <h3 className="md:text-4xl sm:text-3xl text-2xl font-bold text-black  text-center">
                  {`${UserData?.userProfile1.firstName} ${UserData?.userProfile1.lastName}`}
                </h3>
                <div className='text-sm mt-2 text-center md:px-20 lg:w-1/2 mx-auto font-extrabold font-mono'>
                  {UserData?.userProfile2 && UserData?.userProfile2.description}
                </div>
              </>
            ) : (
              <div className="animate-pulse flex space-x-4 border-0 mx-auto w-fit">
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 rounded w-20 mx-auto"></div>
                  <div className="h-2 bg-slate-200 rounded w-60 mx-auto"></div>
                </div>
              </div>
            )}
            <div className="sm:mx-auto md:mx-auto lg:mx-auto pt-2 bg-white rounded-lg text-gray-900">
              <ul className=" text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                  <div className='text-sm font-extrabold font-mono'>Friends</div>
                  {info?.friendCount || info?.friendCount === 0 ?
                    <div className='text-xl font-bold font-mono'>{info?.friendCount}</div>
                    :
                    <div className='text-sm font-extrabold font-mono'>{<div className='animate-pulse w-10 h-2 rounded bg-gray-300 mx-auto'></div>}</div>
                  }
                </li>
                <li className="flex flex-col items-center justify-between">
                  <div className='text-sm font-extrabold font-mono'>Post</div>
                  {info?.postCount || info?.postCount === 0 ?
                    <div className='text-xl font-bold font-mono'>{info?.postCount}</div>
                    :
                    <div className='text-sm font-extrabold font-mono'>{<div className='animate-pulse w-10 h-2 rounded bg-gray-300 mx-auto'></div>}</div>
                  }
                </li>
              </ul>
              {loggedUser !== null && loggedUser !== searchedUserId ? (<><CheckFriendStatus searchedUserId={searchedUserId} /></>) : null}
            </div>
          </div>
          {loggedUser !== null && (
            <div className='md:hidden'>
              <div className="flex w-full mt-3 border-gray-100 max-lg:flex-col">
                <nav className="px-2 gap-x-5 flex -mb-px text-gray-600 font-medium text-[15px] justify-around w-full max-md:w-full max-md:overflow-x-hidden">
                  <div onClick={() => toggleListDisplay(0)} className="cursor-pointer w-full rounded-lg px-16 sm:px-20 text-center font-semibold bg-gray-200 active:bg-gray-300 leading-8">Post</div>
                  <div onClick={() => toggleListDisplay(2)} className="cursor-pointer w-full rounded-lg px-16 sm:px-20 text-center font-semibold bg-gray-200 active:bg-gray-300 leading-8">About</div>
                </nav>
              </div>
            </div>
          )}
        </div>

        {loggedUser !== null && (
          <div className='lg:pt-5 md:flex mt-2'>
            {(() => {
              if (ListDisplay === 0) {
                return (
                  <>
                    {searchedUserId ? <SearchedPersonPost searchedUserId={searchedUserId} /> : null}
                    <div className='hidden ml-2 md:block h-fit'>
                      <UserProfile userProfile={UserData?.userProfile2} userName={UserData?.userProfile1?.userName} joinedOn={UserData?.userProfile1?.createdAt} />
                    </div>
                  </>
                );
              } else if (ListDisplay === 1) {
                return null;
              } else if (ListDisplay === 2) {
                return <div className='md:hidden'><UserProfile userProfile={UserData?.userProfile2} /></div>;
              }
            })()}
          </div>
        )}

        {loggedUser === null && (
          <div className='w-fit mx-auto mt-10'>
            <div onClick={() => navigator("/")} style={{ textDecoration: "none" }} className="cursor-pointer font-bold rounded-md bg-[#3662d2] mt-10 py-2 px-10 mx-auto w-fit border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              Login to see post and connect
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedPerson;