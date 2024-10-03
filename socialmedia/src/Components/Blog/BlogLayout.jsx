import React from 'react';
import {Link} from 'react-router-dom';
import BlogPage from './BlogPage';

const BlogLayout = () => {

  return (
    <div className='w-full lg:w-[80%] lg:p-5 lg:absolute top-10 right-0'>
      <div className='flex gap-10 pt-2 lg:pt-10 pl-2 lg:ml-[19px]'>
        <Link to='/blog/CreateBlog' style={{ textDecoration: "none" }}>
          <button type="button" className="button flex p-2 px-3 bg-[#406bd7] hover:bg-[#839fe8] text-white shadow-sm gap-x-3 place-content-center items-center rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <div className='font-bold'>Create Blog</div>
          </button>
        </Link>
      </div>
      <BlogPage />
    </div>
  );
}

export default BlogLayout;