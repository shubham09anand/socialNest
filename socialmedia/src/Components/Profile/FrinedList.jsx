import React, { useState } from "react";
import AcceptedFriendList from "../FriendList/AcceptedFriendList";
import RecivedFriendRequesList from "../FriendList/RecivedFriendRequesList";
import SendedFriendReuest from "../FriendList/SendedFriendReuest";

const FrinedList = () => {
  const [SelectFiled, setSelectFiled] = useState("Friends With");
  const [expandList, setExpandList] = useState(false);

  const handleDisplay = (item) => {
    setSelectFiled(item);
    setExpandList(false);
  }

  return (
    <div className="w-screen lg:w-[80%] lg:p-5 lg:absolute right-0">
      <div className="mt-10 mx-auto lg:ml-0 relative h-16">
        <div className=" mx-auto w-fit">
          <div onClick={() => expandList ? setExpandList(false) : setExpandList(true)} className="p-2 w-80 h-fit flex place-content-center items-center space-x-5 text-center text-white cursor-pointer bg-[#4c6ecd] hover:bg-[#6f87cc] text-[18px]">
            <div>{SelectFiled}</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`size-4 duration-300 ${expandList ? 'rotate-180' : 'rotate-0'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>

          </div>

          {expandList && (
            <div className="bg-white absolute z-10 shadow-[.1px_.1px_.1px_black]">
              <div onClick={() => { handleDisplay("Friends With") }} className="cursor-pointer p-2 text-center text-[15px] w-80 border-b border-x">Friends With</div>
              <div onClick={() => { handleDisplay("Recived Request") }} className="cursor-pointer p-2 text-center text-[15px] w-80 border-b border-x"> Recived Request</div>
              <div onClick={() => { handleDisplay("Sended Request") }} className="cursor-pointer p-2 text-center text-[15px] w-80 border-b border-x">Sended Request</div>
            </div>
          )}
        </div>
      </div>

      {SelectFiled === "Friends With" && (
        <AcceptedFriendList />
      )}

      {SelectFiled === "Recived Request" && (
        <RecivedFriendRequesList />
      )}

      {SelectFiled === "Sended Request" && (
        <SendedFriendReuest />
      )}
    </div>
  );
};

export default FrinedList;
