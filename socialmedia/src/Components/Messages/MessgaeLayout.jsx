import React, { useState, createContext } from 'react';
import ContactList from './ContactList';
import ReciverProfile from './ReciverProfile';
import ScheduledMessage from './ScheduledMessage';
const MessageBoxDisplay = createContext();

const MessageLayout = () => {

  const [Display, setDisplay] = useState(true);
  const [ProfileDisplay, setProfileDisplay] = useState(0);

  const toggleDisplay = (value) => {
    setDisplay(value);
  };

  const toggleprofileDisplay = (value) => {
    setProfileDisplay(value);
  };  

  return (
    <>
      <div className='w-full lg:w-[80%] lg:p-2 lg:absolute right-0 border-l-2'>
        <MessageBoxDisplay.Provider value={Display}>
          <div className='flex overflow-scroll'>
            {Display ? <ContactList toggleDisplay={toggleDisplay} /> : null}
            {!Display ?
              <>
                {
                  ProfileDisplay === 2 ? <ReciverProfile toggleprofileDisplay={toggleprofileDisplay} />
                    : ProfileDisplay === 1 ? <ScheduledMessage toggleprofileDisplay={toggleprofileDisplay} /> : null
                }
              </> :
              null
            }
          </div>
        </MessageBoxDisplay.Provider>
      </div>
    </>
  );
};

export default React.memo(MessageLayout);