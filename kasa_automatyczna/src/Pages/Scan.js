import React, {useState,useEffect, useRef} from 'react'
import { useAppState } from '../Context/appStateContext';
import { Link } from 'react-router-dom';
import Keyboard from '../Components/Keyboard'
import {hideInput} from '../Config'
export default function Scan() {
    const [qrInput, setData] = useState("");
    const { getSessionFromQrValue } = useAppState();
    const focusDiv = useRef();

    const keepFocuse = () => {
      if(focusDiv.current) focusDiv.current.focus(); 
    }

    useEffect(() => {
      if(qrInput.length >= 6)
        getSessionFromQrValue(qrInput).finally(() => setData(""))
    }, [qrInput]);
  return (
    <div className='w-full flex flex-1 text-center flex-col'>
      <div className='flex flex-col items-center m-auto'>
          <h1 className='text-center text-2xl mb-3 font-semibold my-3'>
            Zeskanuj kod QR widoczny na bilecie, lub przepisz ciąg znaków widoczny pod nim - jeżeli skaner go nie rozpoznaje
          </h1>
          <input
              id="qrInput"
              value={qrInput}
              ref={focusDiv}
              onBlur={keepFocuse}
              autoFocus
              style={{visibility: hideInput ? 'hidden': 'visible'}}
              autoComplete="off"
              className="bg-gray-200 border border-gray-300 text-white-900 
                  text-xl text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 
                  block max-w-lg w-full m-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div style={{visibility: hideInput ? 'hidden': 'visible'}}>
        <Keyboard onChange={(i) => setData(i)} value={qrInput}/>
      </div>
    </div>
  )
}
