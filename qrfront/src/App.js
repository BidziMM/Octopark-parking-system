import React, {useEffect, useState} from 'react';
import './App.css';
import DisplayQrCode from './DisplayQr/DisplayQrCode';

function App() {
  const [isOnline, setOnline] = useState(true);

  useEffect(()=>{
      setOnline(navigator.onLine)
  },[])

  // event listeners to update the state 
  window.addEventListener('online', () => {
      setOnline(true)
  });

  window.addEventListener('offline', () => {
      setOnline(false)
  });
  console.log(process.env)
  return (
    <div className="App">
      <header className="App-header">
        <DisplayQrCode isOnline={isOnline} />
        {
          !isOnline && <h4 style={{color:"red"}}>Połączenie z Internetem zostało przerwane 😔</h4>
        }
      </header>
    </div>
  );
}

export default App;
