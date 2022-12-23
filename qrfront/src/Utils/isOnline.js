import {useState,useEffect} from 'react'
export default function useCheckConnection() {
    const [isOnline, setOnline] = useState(true);
    useEffect(()=>{
        setOnline(navigator.onLine)
        console.log("check internet")
    },[])
  
    // event listeners to update the state 
    window.addEventListener('online', () => {
        setOnline(true)
    });
  
    window.addEventListener('offline', () => {
        setOnline(false)
    });
    return isOnline
}
