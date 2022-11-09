import React, {useState} from 'react';
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AppProvider, useAppState } from "./Context/appStateContext";
import {WebSocketProvider} from './Context/webSocketContext'
import './App.css';
import DisplayCurrentDate from './Components/DisplayCurrentDateAndTime';

import MainScreen from './Pages/MainScreen';
import SessionInfo from './Pages/Session/SessionInfo';
import CarPlate from './Pages/CarPlate';
import Scan from './Pages/Scan';
import RouterPreviousPage from './Components/RouterPreviousPage';
import {homepage} from './Config'
function App() {

  return (

      <div className="App max-w-5xl m-auto">
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <BrowserRouter basename={homepage}>
          <DisplayCurrentDate/>
          <WebSocketProvider>
          <AppProvider>
            <Routes>
                <Route path="/" element={<MainScreen />}/>
                <Route path="/userSession" element={<SessionInfo />}/>
                <Route path="/carPlate" element={<CarPlate />}/>
                <Route path="/scan" element={<Scan />}/>
            </Routes>
          </AppProvider>
          </WebSocketProvider>
        </BrowserRouter>

        </SnackbarProvider>
      </div>

  );
}

export default App;
