import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import feed from '../Assets/images/icons/home.png';
import message from '../Assets/images/icons/message.png';
import friends from '../Assets/images/icons/group-2.png';
import news from '../Assets/images/icons/news.png';
import blog from '../Assets/images/icons/blog.png';
import DashboardLoading from "./Animation/DashBoardLaoding";

const Dashboard = ({ dashboardDisplay, setDashboardDisplay }) => {
  const navigate = useNavigate();
  const [isDashBoardLoading, setIsDashBoardLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    setTimeout(() => {
      setIsDashBoardLoading(false);
    }, 1100);

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handelDashBoardDisplay = (link) =>{
    navigate(link);
    setDashboardDisplay(false)
  }
  const isDashboardVisible = screenSize >= 1024 || dashboardDisplay;


  return (
    <>
      {isDashBoardLoading ? (
        <DashboardLoading />
      ) : (
        <div className={`select-none w-full lg:w-56 fixed ${isDashboardVisible ? 'block z-20 backdrop-blur-3xl h-screen' : 'hidden'}`}>
          <div className="simplebar-content" style={{ padding: "0px calc(36px) 0px 0px; height: 100%; overflow: hidden scroll" }}>
            <nav id="side"className='lg:mt-14'>
              <div onClick={()=>handelDashBoardDisplay('/home')} style={{ textDecoration: 'none' }} to="/home" className="rounded-lg active:opacity-60 cursor-pointer h-fit">
                <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                  <img src={feed} alt="feeds" className="w-6" />
                  <span>Home</span>
                </div>
              </div>
              <div onClick={()=>handelDashBoardDisplay('/message')} style={{ textDecoration: 'none' }} to="/message" className="rounded-lg active:opacity-60 cursor-pointer">
                <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                  <img src={message} alt="messages" className="w-5" />
                  <span>Messages</span>
                </div>
              </div>
              <div onClick={()=>handelDashBoardDisplay('/friends')} style={{ textDecoration: 'none' }} to="/friends" className="rounded-lg active:opacity-60 cursor-pointer">
                <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                  <img src={friends} alt="friends" className="w-6" />
                  <span>Friends</span>
                </div>
              </div>
              <div onClick={()=>handelDashBoardDisplay('/news')} style={{ textDecoration: 'none' }} to="/news" className="rounded-lg active:opacity-60 cursor-pointer">
                <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                  <img src={news} alt="news" className="w-6" />
                  <span>News</span>
                </div>
              </div>
              <div onClick={()=>handelDashBoardDisplay('/blog')} style={{ textDecoration: 'none' }} to="/blog" className="rounded-lg active:opacity-60 cursor-pointer">
                <div className='flex items-center gap-10 p-3 px-4 capitalize'>
                  <img src={blog} alt="blog" className="w-6" />
                  <span>Blog</span>
                </div>
              </div>
              <div onClick={()=>handelDashBoardDisplay('/account-setting')} style={{ textDecoration: 'none' }} to='/account-setting'>
                <div className='flex items-center gap-10 px-4 capitalize mt-5'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Setting</span>
                </div>
              </div>
              <div onClick={handleLogOut} className='mt-4 mx-auto cursor-pointer'>
                <div className='flex items-center gap-10 px-4 capitalize'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                  </svg>
                  <span>Log Out</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
