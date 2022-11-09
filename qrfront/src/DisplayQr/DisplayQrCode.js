import React, {useEffect, useState} from 'react';
import QRCode from "react-qr-code";
import axios from 'axios';
import {printRequest, openColumnRequest} from '../Api'
import {errorPrinter} from '../devTools/requestDev'
import { bufforTime, qrCodeSize, domain, tagId,parkingId,isEntrance,isOutgoing,mercury, dev } from '../Config'
import QrScanner from './QrScanner';
import Modal from '../Components/Modal'

function DisplayQrCode({ isOnline }) {
  const [data, setData] = useState({
    qrValue:null,
    qrCode:null,
    refreshTime:null,
    loading:true,
    parkingId:parkingId,
    tagId:tagId,
    expireTime:null
  })
  const [err, setErr] = useState()
  
  var myTimer;
  useEffect(() => {
    getSettings();
    getQrCode();
    setData(prev => ({ ...prev, loading:false }));
  }, [])

  useEffect(() => {
    if(data.refreshTime){
        //Start zapytania na serwer co ustalona ilosc czasu
        myTimer = setInterval(getQrCode, (data.refreshTime * 1000) - bufforTime)
    };
  }, [data.refreshTime])

  useEffect(() => {
    //Rozpoczęcie nasłuchiwania na event od serwera
    const eventSource = new EventSource(mercury + encodeURIComponent(`qr/${data.parkingId}/${data.tagId}/scanned`));
    eventSource.onerror = function(event){
      var txt;
      switch( event.target.readyState ){
         case EventSource.CONNECTING:
             txt = 'Reconnecting...';
             break;
      }
      console.log(txt);
    };
    eventSource.onmessage = event => {
        // Will be called every time an update is published by the server
        const eventData = JSON.parse(event.data)
        if(eventData.scanned === true){
          getQrCode()
        }
    }
    return () => {
      eventSource.close()
    }
  }, [])

  useEffect(() => {
    const delaySetErr = setTimeout(() => {  
      setErr()
    },7000)
    return () => clearTimeout(delaySetErr)
  }, [err])

  const DisplayModalSuccess = () =>{
    setErr({title:"Sesja", msg:"Sesja została stworzona prawidłowo. Miłego Dnia", status:"success"})
    setTimeout(() => {  
      setErr()
    },2000)
  }

  //Funkcja do resetowania czasu. Jezeli uzytkownik zeskanuje kod timer jest odswiezany
  const clearTimer = () => {
    if(data.refreshTime){
        clearInterval(myTimer);
        myTimer = setInterval(getQrCode, (data.refreshTime * 1000) - bufforTime);
    };
  }

  //Startowa funkcja do pobrania kodu qr i ustawień
  const getSettings = () => {
    axios.get(`${domain}/app/settings/qrtime`)
    .then((res) => {
      setData(prev => ({...prev, refreshTime:res.data.generateTime}))
    })
    .catch(() => {
      console.log("Problem z pobraniem danych")
    })
  }

  const getQrCode = () => {
    //axios.post('http://127.0.0.1:8001/create/current/unique/authorisation/code',{
    axios.post(`${domain}/generate-qr-code`,{
      obj:{
        parkingId:data.parkingId,
        tagId:data.tagId
      }
    })
    .then((res) => {
      const { parkingId, tagId } = data
      const qrValue = res.data.value
      setData(prev => ({...prev, qrValue:qrValue,qrCode: generateLinkFromQr({ qrValue, parkingId, tagId }) }))
      clearTimer()
    })
    .catch(() => {
      setTimeout(getQrCode, 5000)
      console.log("Problem z pobraniem danych")
    })
  }
  // http://octopark.app/authorize-code/tagId/parkingId/09910jda9ws0dj90212328901djio
  // Teraz http://octopark.app/authorize-code?tagId='tagId'&parkingId='parkingId'&qrValue=09910jda9ws0dj90212328901djio
  const generateLinkFromQr = ({ parkingId,tagId, qrValue }) => {
    return `http://octopark.app/authorize-code?tagId=${tagId}&parkingId=${parkingId}&qrValue=${qrValue}`
  }

  if(data.loading || data.qrCode === null){
    console.log(data)
    return(
      <h1>loading...</h1>
    )
  }

  const printQrCode = async () => {
      try{
        await printRequest({ qrValue:data.qrValue })
        .catch((err) => {
          setErr({title:"Drukarka", msg:"Nie można wydrukować biletu"})
          throw err
        })
        const openRequestData = await openColumnRequest({ qrValue:data.qrValue })
        .catch((err) => {
          setErr({title:"Szlaban", msg:"Nie można otworzyć szlabanu"})
          throw err
        })
        if(openRequestData?.createdDatabaseRowId == 0){
          setErr({title:"Serwer", msg:"Nie można otworzyć szlabanu"})
        }
      }catch(err){
        console.log(err)
      }
  }

  return (
    <div className='flex flex-col items-center'>
    {err && <Modal title={err.title} msg={err.msg} closeModal={() => setErr()} />}
      {/* Tylko do testów
        <input onChange={(e) => setData(prev => ({...prev, parkingId:e.target.value}))} value={data.parkingId} className="mr-2 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-1/3 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text"></input>
        <input onChange={(e) => setData(prev => ({...prev, tagId:e.target.value}))} value={data.tagId}className="ml-2 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-1/3 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text"></input>
      */}
      <h3 className='pb-5 font-semibold'>Zeskanuj kod aby rozpocząć sesje</h3>
      <QRCode value={data.qrCode} size={qrCodeSize}/>
      <button disabled={!isOnline} onClick={getQrCode} className={`  `}>Kilijnij aby wygenerować</button>
      <div className='w-full'>
        {isEntrance && 
            <button
              className="flex-none my-4 w-full h-20 px-6 mt-4 rounded-md uppercase font-medium tracking-wider bg-slate-600 text-white"
              type="submit"
              onClick={() => printQrCode(data.qrCode)}
            >
              Pobierz bilet
            </button>
          }
          {
            dev && 
              <button
                className="flex-none my-4 w-full h-20 px-6 mt-4 rounded-md uppercase font-medium tracking-wider bg-slate-600 text-white"
                type="submit"
                onClick={() => errorPrinter(setErr)}
              >
                Pobierz bilet error dev
              </button>
          }
          {isOutgoing && 
            <QrScanner err={err} setErr={setErr}/>
          }
        </div>
    </div>
  );
}

export default DisplayQrCode;
