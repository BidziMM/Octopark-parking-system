import axios from "axios";
import { domain } from "../Config";
import React, {
    useState,
    useContext,
    useRef,
    useEffect,
    createContext,
  } from "react";
  import {
    useNavigate,
    useLocation
  } from 'react-router-dom';

import transformSessionData from "../Utility/transformSessionData";

import IdleComponent from "../Components/IdleComponent";

import ModalError from "../Components/ModalError";

  const AppContext = createContext();
  
  export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [err, setErr] = useState();
    const navigate = useNavigate();
    const appLocation = useLocation()
    useEffect(() => {
      if(userData){
        navigate('/userSession');
      }else{
        navigate('/');
      }
    }, [userData])
    useEffect(() => {
      if(appLocation.pathname === "/")
      setUserData()
    },[appLocation])

    const getSessionFromQrValue = async (qrValue) => {
      //Dev test request http://octopark.app/authorize-code?tagId=in1&parkingId=33&qrValue=AsazHD7lbI8ZHsQgugkM
      try {
        const sessionData = await axios
          .post(`${domain}/consumer/session/qr-code`, {
            obj: {
              uniqueAuthorisationCodeValue: qrValue,
            },
          })
          .then((res) => res.data)
  
          if (!sessionData.sessionExist || !sessionData.qrSessionExist) {
            return setErr({title:"Sesja", msg:"Sesja nie istnieje"})
            // runErrorAlert(
            //   "Błąd !",
            //   "Uwaga! Element, za który chcesz zapłacić nie istnieje w bazie danych! spróbuj ponownie, lub zrestartuj aplikację."
            // );
          }
  
          if (sessionData.sessionStatus == "closed") {
            return setErr({title:"Sesja", msg:"Sesja została zamknięta"})
            // runErrorAlert(
            //   "Błąd !",
            //   "Uwaga! Element, za który chcesz zapłacić nie istnieje w bazie danych! spróbuj ponownie, lub zrestartuj aplikację."
            // );
          }
        let { returnObject } = await axios
          .post(`${domain}/consumer/my-active-sessions`, {
            obj: {
              anonymousUser: sessionData?.anonymousUser,
              sessionId: sessionData.sessionId,
            },
          })
          .then((res) => res.data)
          .catch((err) => console.log(err));
  
        const tData = transformSessionData({data:returnObject, sessionData, qrValue})
        setUserData(tData);
      } catch (err) {
        console.log("Problem z pobraniem danych");
        console.log(err);
        if (err?.response?.data?.sessionStatus) {
          setErr({
            title:"Sesja",
            msg:"Ta sesja została już zamknięta"
          })
        }
      }
    }

    return (
      <AppContext.Provider
        value={{
            userData,err,setUserData,setErr,getSessionFromQrValue
        }}
      >
        {children}
        <ModalError err={err} isOpen={!!err} status={err?.status} closeModal={() => setErr()}/>
        {appLocation.pathname !== "/" && false && <IdleComponent timeout={10000} promptTimeout={20000} />}
      </AppContext.Provider>
    );
  };
  
  export const useAppState = () => useContext(AppContext);