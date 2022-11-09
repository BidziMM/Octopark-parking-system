import React, { useEffect, useState, useRef } from "react";
import { Navigate ,Link } from "react-router-dom";
import ActiveSession from "./Components/ActiveSession";
import CircleInfo from "./Components/CircleInfo";
import PrepaymentModal from "./Components/PrepaymentModal";
import { useAppState } from "../../Context/appStateContext";
import { handlePayment, payForParking } from "../../Api/Payment";
import PrintTicketComponent from "../../SpecialComponents/PrintTicket";
import {specialContexts, printOption} from '../../Config'

export default function SessionInfo() {
  const { userData, setUserData, setErr,getSessionFromQrValue } = useAppState();
  const [paymentData, setPaymentData] = useState();
  const [prepaymentModalOpen, setPrepaymentModal] = useState(false)
  const printerRef = useRef()
  console.log(userData)
  //selectedPaymentOption: online_transfer
  //Type current_overriding_session
  const createPayment = () => {
    handlePayment({
      paymentOption: "terminal",
      paymentTargetRecordName: "current_overriding_session",
      requestInvoice: false,
      anonymousUser: userData.overridingSessionObject.anonymousUser,
      sessionId: userData.overridingSessionObject.id,
    })
      .then((json) => {

        if (json.paymentTargetRecordId_doesntExist == true) {
          return setErr({title:"Sesja", msg:"Uwaga! Element, za który chcesz zapłacić nie istnieje w bazie danych! spróbuj ponownie"})
          // runErrorAlert(
          //   "Błąd !",
          //   "Uwaga! Element, za który chcesz zapłacić nie istnieje w bazie danych! spróbuj ponownie, lub zrestartuj aplikację."
          // );
        }

        if (json.tryToPayButBalanceToPayIs0 == true) {
          //runErrorAlert("Błąd !", "Sesja jest już opłacona");
          setErr({title:"Sesja", msg:"Sesja jest już opłacona"})
        }
        //Nie ma stworzonej nowej tranzakcji, musisz to jakos obsluzyc
        if (json.createdTransactionRowId == 0) {
          return setErr({title:"Opłata", msg:"Bład podczas tworzenia nowej tranzakcji, spróbuj później"})
        } // createdTransactionRowId != 0
        setPaymentData(json);
      })
      .catch((error) => {
        console.warn("error bramka handlePayment ajax");
        console.warn(error);
        //runErrorAlert("Błąd!", "Sprawdź połączenie z internetem");
      });
    //.finally(() => handleChange({ loadingPaymentHandling: false }));
  };
  const makePayment = (transactionRowId) => {
    if(!!transactionRowId)
      payForParking({
        transactionId: transactionRowId,
      })
      .then(data => {
        console.log(data)
        console.log(data.paymentSuccess, userData.overridingSessionObject.qrValue)
        if(data.paymentSuccess){
          getSessionFromQrValue(userData.overridingSessionObject.qrValue)
        }
      })
      .catch((err) => {
        console.log(err)
        return setErr({title:"Błąd serwera", msg:"Bład podczas opłaty, spróbuj później"})
      });
  };
  if(!userData){
    return <Navigate to={'/'} />
  }
  return (
    <div className="max-w-3xl w-full relative flex flex-col items-center">
      <PrepaymentModal isOpen={prepaymentModalOpen} closeModal={() => setPrepaymentModal(false)} data={userData.overridingSessionObject}/>
      <CircleInfo data={userData} />
      <ActiveSession data={userData} />
      <div className="flex w-full">
        <button
          onClick={() => setPrepaymentModal(true)}
          className="flex-1 m-4 w-full w-1/3 h-14 uppercase font-medium tracking-wider bg-slate-600 text-white"
        >
          Opłać z góry
        </button>
        {
        /*
          <button
            onClick={createPayment}
            className="flex-none m-4 w-full h-12 uppercase font-medium tracking-wider bg-slate-600 text-white"
          >
            Stworz tranzakcje
          </button>
          <button
            onClick={() => makePayment(paymentData?.createdTransactionRowId)}
            className="flex-none m-4 w-full h-12 uppercase font-medium tracking-wider bg-slate-600 text-white"
          >
            Opłać sesję
          </button>
        */
      }

        {specialContexts.includes("park_and_ride_torun") && printOption &&
        <>
          <button
          
          onClick={() => printerRef && printerRef.current.PrintTicket()}
            className="flex-1 m-4 w-1/3 h-14 uppercase font-medium tracking-wider bg-slate-600 text-white"
          >
            Drukuj bilet
          </button>
          <PrintTicketComponent ref={printerRef} qrValue={userData.overridingSessionObject.qrValue}/>
        </>
        }

        <Link className="m-4 w-1/3 flex-1" to={'/'}>
          <button
            onClick={() => setUserData()}
            className="h-14 p-1 uppercase font-medium tracking-wider bg-slate-600 text-white"
          >
            Powrót do ekranu głównego
          </button>
        </Link> 
      </div>
    </div>
  );
}
