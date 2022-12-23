import React, {useState, useEffect, useRef} from 'react'
import { getSession,openColumnRequest, openLocalInveo} from '../Api'
import Modal from '../Components/Modal'
import checkErrors from './checkErrors'
import LogCollector from './logCollector'
import Config from '../Config'
import useCheckConnection from '../Utils/isOnline'

export default function QrScanner({setErr}) {
    const [input, setInput] = useState('')
    const isOnline = useCheckConnection()
    let refLog = useRef();

    const openRequest = async (qrValue) => {
        try{
            let responseSessionData;
            if (!isOnline && !refLog.current.isAutomaticReleseTriggered() && Config.automaticRelease !== -1){
                return setErr({title:"Parking", msg:`Parking nie posiada połączenia z internetem. Jeżeli połączenie nie zostanie przywrócone opuścić parking za ${Config.automaticRelease - refLog.current.currentTimer()} sekund`})
            }
            if(!isOnline && refLog.current.isAutomaticReleseTriggered()){
                refLog.current.addLog(qrValue)
                return openLocalInveo()
                .catch(() => setErr({title:"Parking", msg:"Nie mozna otworzyć szlabanu"}))
            }

            const data = await getSession({qrValue})
            if(!data?.qrSessionExist || !data?.sessionExist){
                return setErr({title:"Sesja", msg:"Sesja nie istnieje"})
            }

            if(data?.sessionStatus === "closed")
                return setErr({title:"Sesja", msg:"Sesja została już zamknięta"})

            if(data?.sessionId)
                responseSessionData = await openColumnRequest({qrValue})
            
            const errors = checkErrors(responseSessionData)
            if(errors) setErr(errors)
        }catch(err){
            console.log(err)
            if(!isOnline){
               return setErr({title:"Parking", msg:"Parking nie posiada połączenia z internetem, proszę skontaktować się z właścicielem parkingu"})
            }
            setErr({title:"Serwer", msg:"Mamy akutalnie problem z serwerem proszę spróbować później"})
        }
        finally{
            setInput('')
        }
    }


    useEffect(() => {
        let delayRequest;
        if(input.length > 0)
            delayRequest = setTimeout(() => openRequest(input), 400);
        return () => clearTimeout(delayRequest)
    }, [input])
    
  return (
    <LogCollector ref={refLog}>
        <input id="qrInput" 
            value={input}
            className="bg-gray-500 border border-gray-300 text-white-900 my-4
            text-xl text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 
            block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setInput(e.target.value)}
        />
    </LogCollector>
  )
}
