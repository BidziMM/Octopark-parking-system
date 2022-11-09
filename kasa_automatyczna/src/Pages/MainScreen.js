import React, { useEffect, useState } from "react";
import timeFormatParking from "../Utility/timeFormatParking";
import Logo from '../Components/Logo'
import ModalError from "../Components/ModalError";
import { useAppState } from "../Context/appStateContext";
import { AiFillCar } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5"
import { GiSmartphone } from 'react-icons/gi'
import {FaTicketAlt} from 'react-icons/fa'

import IconButtons from "../Components/IconButtons";

function MainScreen() {
  const [qrInput, setData] = useState("");
  const { getSessionFromQrValue, err, setErr, setUserData } = useAppState();
  useEffect(() => {
    setUserData()
  }, [])
  useEffect(() => {
    if(qrInput.length >= 20)
      getSessionFromQrValue(qrInput).finally(() => setData(""))
  }, [qrInput]);

  return (
    <div className="w-full">
      <div className="w-1/3 flex m-auto justify-center">
        <Logo/>
      </div>
      <h5 className="text-center text-2xl font-semibold mb-6">Proszę o identyfikację</h5>
      <div className="flex row text-center">
        <IconButtons to={'/scan'} text="zeskanuj kod biletu widoczny w aplikacji - jeśli użyłeś jej do wjazdu" Icon={GiSmartphone}/>
        <IconButtons to={'/scan'} text="zeskanuj bilet pobrany przy wjeździe" Icon={FaTicketAlt}/>
        <IconButtons to={'/carPlate'} text="lub wpisz swój numer rejestracyjny pojazdu" Icon={AiFillCar}/>
      </div>
    </div>
  );
}

export default MainScreen;
