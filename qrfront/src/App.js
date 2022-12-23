import React, {useEffect, useState} from 'react';
import './App.css';
import DisplayQrCode from './DisplayQr/DisplayQrCode';
import Config from './Config';

function App() {
  const [isOnline, setOnline] = useState(true);
  const [settingsDownloaded, setSettingsDownloaded] = useState(false)
  const [loading, setLoding] = useState(true)
  useEffect(() => {
    Config.downloadSettings()
    .then(() => {
      setSettingsDownloaded(true)
    })
    .catch(() => {
      setSettingsDownloaded(false)
    })
    .finally(() => {
      setLoding(false)
    })
  }, [])

  useEffect(()=>{
      setOnline(navigator.onLine)
  },[])

  // event listeners to update the state 
  window.addEventListener('online', () => {
      setOnline(true)
  });

  window.addEventListener('offline', () => {
      console.log("net offline")
      setOnline(false)
  });

  if(loading){
    <div className="App">
    <header className="App-header">
      <h3 className='pb-5 font-semibold'>Pobieranie konfiguracji</h3>
    </header>
  </div>
  }
  if(!settingsDownloaded && !loading){
    return(
      <div className="App">
      <header className="App-header">
        <h3 className='pb-5 font-semibold'>Konfiguracja wstępna nie została pobrana, sprawdź czy masz dostęp do internetu</h3>
      </header>
    </div>
    )
  }
  if(!loading)
  return (
    <div className="App">
      <header className="App-header">
        <DisplayQrCode isOnline={isOnline} />
        {
          // / !isOnline && <h4 style={{color:"red"}}>Połączenie z Internetem zostało przerwane 😔</h4>
        }
      </header>
    </div>
  );
}

export default App;
