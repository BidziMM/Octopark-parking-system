import React, {useEffect, useState} from "react";

export const useDate = () => {
    const locale = 'pl';
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update
  
    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
        // This will trigger a rerender every component that uses the useDate hook.
        setDate(new Date());
      }, 1000);
      return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
      }
    }, []);
  
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
  
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second:'numeric' });
  
    return {
      date,
      time,
    };
  };