import React, {useEffect, useState, useRef} from 'react'
import { useIdleTimer } from 'react-idle-timer'
import {useNavigate} from 'react-router-dom'

export default function IdealComponent({timeout, promptTimeout}) {
    const timerCounterBeforeNavigation = promptTimeout/1000
    const navigate = useNavigate();
    const [displayTimer, setDisplayTimer] = useState(false)
    const [timer, setTimer] = useState(timerCounterBeforeNavigation)
    const interval = useRef(null)
    const countDown = () => {
      setTimer(timerCounterBeforeNavigation)
      interval.current =setInterval(() => setTimer(p => p-1), 1000)
    }

    const {isIdle} = useIdleTimer({ 
      timeout:timeout,
      promptTimeout:promptTimeout,
      onAction:() => {
        clearInterval(interval.current)
        setDisplayTimer(false)
      },
      onPrompt:() => {
        setDisplayTimer(true)
        countDown()
      }
    })

    useEffect(() => {
      if(isIdle()){
        navigate('/')
      }
    }, [isIdle()])

  if(!displayTimer){
    return null
  }
  return (
    <div className="fixed bottom-10 right-0 left-0 rounded w-1/3 m-auto p-2 bg-gray-100">
      <h1 className='text-xl text-center'>Brak aktywności.<br/>Przeniesienie do ekranu głównego za:</h1>
      <h1 className='text-5xl text-center'>{timer}</h1>
    </div>
  )
}
