import React, {useState, useRef} from 'react'
import {getSessionIdByNumberPlate, getUserSession} from '../Api/Session'
import { useAppState } from '../Context/appStateContext'
import transformSessionData from '../Utility/transformSessionData'
import Keyboard from '../Components/Keyboard'

export default function CarPlate() {
    const {setUserData, setErr} = useAppState()
    const [numberPlate, setNumber] = useState('')
    const inputRef = useRef()

    const onKeyPress = (button) => {
        if(button === "{ent}") getSession()
      }
    const getSession = async () => {
        try{
            const {sessionId} = await getSessionIdByNumberPlate({
                numberPlate
            })
            if(!!sessionId === false){
                return setErr({
                    title:"Bład sesji",
                    msg:"Niestety na parkingu nie ma pojazdu z tym numerem rejestracyjnym"
                })
            }
            console.log(sessionId)
            const {returnObject} = await getUserSession({sessionId})
            if(returnObject.overridingSessionObject.isActive === false){
                return setErr({
                    title:"Bład sesji",
                    msg:"Sesja nie istnieje lub zostałą zamknięta"
                })
            }
            const tData = transformSessionData({data:returnObject, sessionData:{sessionId}})
            setUserData(tData)
        }catch(err){
            return setErr({
                title:"Bład serwera",
                msg:"Przepraszamy, aktualnie nie mozemy wykonać polecenia"
            })
        }
    }
  return (
    <div className='flex center flex-col flex-1'>
        <div className='flex flex-col items-center m-auto'>
            <h1 className='text-center text-2xl mb-3 font-semibold'>Wprowadź numer tablicy rejestracyjnej</h1>
            <div className='border-4 w-5/6 border-black rounded-md flex flex-row m-auto' onClick={() => inputRef.current.focus()}>
                <div className='bg-blue-900 w-2/12 flex-none'>

                </div>
                <div className='bg-white h-42 w-10/12 flex-1 flex'>
                    <input
                        ref={inputRef}
                        id="qrInput"
                        autoFocus
                        value={numberPlate}
                        onChange={(e) => setNumber(e.target.value)}
                        className="text-black text-9xl text-center rounded-lg w-full rounded-none focus:outline-none"
                    />
                </div>
            </div>
        </div>
        <div className='mt-auto'><Keyboard onChange={(i) => setNumber(i)} onKeyPress={onKeyPress}/></div> 
    </div>
  )
}
