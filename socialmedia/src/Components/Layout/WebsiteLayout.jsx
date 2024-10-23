import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from '../../Routes/ProtectedRoute';

import Login from "../Account/Login";
import Signup from "../Account/Signup";
import Dashboard from '../Dashboard';
import Header from '../Header';
import MessageLayout from '../Messages/MessgaeLayout';
import UserProfileLayout from '../Profile/UserProfileLayout';
import BlogLayout from '../Blog/BlogLayout';
import BlogContent from '../Blog/BlogContent';
import CreateBlog from '../Blog/CreateBlog';
import BlogPage from '../Blog/BlogPage';
import News from '../Other/News';
import FrinedList from '../Profile/FrinedList';
import UpdateProfile from '../Setting/updateProfile';
import SearchedPerosn from '../SearchedPerson/SearchedPerosn';
import CreateStory from '../Story/CreateStory';
import CreatePost from '../Post/CreatePost';
import ShowSelectedStory from '../Story/showSelectedStory';
import SettingsOptions from '../Setting/settingsOptions';
import UpdatePassword from '../Setting/updatePassword';
import PageNotFound from '../Animation/PageNotFound';
import AuthFailed from '../Animation/AuthFailed';
import MessageBox from '../Messages/MessageBox';
import API from '../../Services/API';

const WebsiteLayout = () => {

  const location = useLocation();
  const currentLocation = location.pathname;
  const loggedUserId = useSelector((state) => state.LoginSlice.loggedUserId);
  const [userPhoto, setUserPhoto] = useState();
  const [dashboardDisplay, setDashboardDisplay] = useState(false);
  const splitCuurPath = currentLocation.split("/");
  const [docTitle, setDocTitle] = useState('');

  useEffect(() => {
    switch (currentLocation) {
      case '/':
        setDocTitle('Login');
        break;
      case '/signup':
        setDocTitle('Sign Up');
        break;
      case '/home':
        setDocTitle('Home');
        break;
      case '/message':
        setDocTitle('Messages');
        break;
      case '/friends':
        setDocTitle('Friends');
        break;
      case '/blog':
        setDocTitle('Blogs');
        break;
      case '/blog/CreateBlog':
        setDocTitle('Create Blog');
        break;
      case '/news':
        setDocTitle('News');
        break;
      case '/account-setting':
        setDocTitle('Account Settings');
        break;
      case '/update-profile':
        setDocTitle('Update Profile');
        break;
      case '/update-password':
        setDocTitle('Update Password');
        break;
      case '/create-story':
        setDocTitle('Create Story');
        break;
      case '/create-post':
        setDocTitle('Create Post');
        break;
      case '/auth-failed':
        setDocTitle('Authentication Failed');
        break;
      default:
        if (currentLocation.startsWith('/story/view-story/')) {
          setDocTitle('View Story');
        } else if (currentLocation.startsWith('/blog/ReadContent')) {
          setDocTitle('Read Blog');
        } else if (currentLocation.startsWith('/message/')) {
          setDocTitle('Message');
        }  else if (currentLocation.startsWith('/searched-person')) {
          setDocTitle('View Profile');
        } 
        
        else {
          setDocTitle('404 - Page Not Found');
        }
        break;
    }
    document.title = docTitle;
  }, [currentLocation, docTitle]);

  useEffect(() => {
    if (loggedUserId && loggedUserId !== null) {
      API.post("/userLoggedDetails", { loggedUserId }).then((res) => {
        setUserPhoto(res.data);
      })
        .catch(() => {
          console.log("Failed To Get Profile Photo");
        })
    }
  }, [loggedUserId]);

  return (
    <>
    {/* // eslint-disable-next-line */}
      {docTitle !== '404 - Page Not Found' && currentLocation !== '/' && currentLocation !== '/auth-failed' && currentLocation !== '/signup' && !currentLocation.startsWith('/searched-profile') && <Header userPhoto={userPhoto} dashboardDisplay={dashboardDisplay} toggleDashboard={() => setDashboardDisplay(prev => !prev)} />}
      {/* // eslint-disable-next-line */}
      <div className='flex'>
      {/* // eslint-disable-next-line */}
        {docTitle !== '404 - Page Not Found' && currentLocation !== '/auth-failed' && currentLocation !== '/' && currentLocation !== '/signup' && loggedUserId !== null && !currentLocation.startsWith("/searched-profile") && <Dashboard dashboardDisplay={dashboardDisplay} setDashboardDisplay={setDashboardDisplay} />}
        {/* // eslint-disable-next-line */}
        <div className={`w-full ${!(currentLocation.startsWith("/message") && splitCuurPath.length === 3 || loggedUserId == null) ? 'lg:pt-4 lg:pb-5' : ''}`}>
        {/* // eslint-disable-next-line */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<ProtectedRoute><UserProfileLayout userPhoto={userPhoto} /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><MessageLayout userPhoto={userPhoto} /></ProtectedRoute>} />
            <Route path="/message/:roomID" element={<ProtectedRoute><MessageBox userPhoto={userPhoto} /></ProtectedRoute>} />
            <Route path="/friends" element={<ProtectedRoute><FrinedList /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><BlogLayout /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
            <Route path="/blog/ReadContent/:articleName/:id" element={<ProtectedRoute><BlogContent /></ProtectedRoute>} />
            <Route path="/blog/CreateBlog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path="/account-setting" element={<ProtectedRoute><SettingsOptions /></ProtectedRoute>} />
            <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/create-story" element={<ProtectedRoute><CreateStory /></ProtectedRoute>} />
            <Route path="/story/view-story/:storyId" element={<ProtectedRoute><ShowSelectedStory /></ProtectedRoute>} />
            <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/searched-person/:searchedUserId" element={<SearchedPerosn />} />
            <Route path="/auth-failed" element={<AuthFailed />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default WebsiteLayout;
