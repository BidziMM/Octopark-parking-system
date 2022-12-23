import React, { useEffect, useState,forwardRef, useImperativeHandle } from 'react'
import logStructure from '../Utils/log'
import useCheckConnection from '../Utils/isOnline'
import Config from '../Config'
import { checkHealth, sendLogs } from '../Api'

const LogCollector = forwardRef((props,ref) => {
    const [logs, setLogs] = useState([])
    //const [startCollectLogs, setStartCollectLogs] = useState(false)
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        console.log(logs)
    }, [logs])

    useImperativeHandle(ref, () => ({
        addLog,
        isAutomaticReleseTriggered,
        currentTimer
    }));

    const currentTimer = () => timer
    console.log("automa time " + Config.automaticRelease)
    const isAutomaticReleseTriggered = () => timer >= Config.automaticRelease && Config.automaticRelease !== -1 ? true : false;

    const addLog = (qrValue) => {
        if(isAutomaticReleseTriggered()){
            const dataLog = logStructure(qrValue)
            setLogs((prev) => [...prev, dataLog])
        }
            
    }
    
    let timerIntervalEvent;
    const connection = useCheckConnection()

    const uploadLogs = async (logs) => {
        try{
            const health = await checkHealth()
            if(health.status === 200){
                await sendLogs(logs)
                return setLogs([])
            }
        }catch(e){
            console.log('Can not upload logs')
        }
    }

    useEffect(() => {
        setTimer(0)
        console.log("collecting logs")
        if(connection === false)
            timerInterval()

        if(connection === true){
            clearInterval(timerIntervalEvent)
        }
        if(connection === true && logs.length > 0){
            uploadLogs(logs)
        }
    }, [connection])

    const timerInterval = () => {
        timerIntervalEvent = setInterval(() => { 
            setTimer((prev) => prev+1)
        }, 1000);
    }
    return(
        props.children
    )
})

export default LogCollector