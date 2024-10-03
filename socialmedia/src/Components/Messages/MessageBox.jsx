import React from 'react';
import MessgaeSection from './MessgaeSection';
import ReciverProfile from './ReciverProfile';

const MessageBox = ({ userPhoto }) => {
  return (
    <>
      <ReciverProfile/>
      <MessgaeSection userPhoto={userPhoto} />
    </>
  );
};

export default React.memo(MessageBox);