import React, { useState, useEffect,useRef } from "react";
//import { Timeit } from "react-timeit";
import { Timeit } from "react-octo-time";
//import { Timeit } from "../../../react-timeit-main/dist/cjs/index";
import Select from "react-select";
import { getParkingPrice, prePayment} from "../../../Api/Payment";
import Modal from "../../../Components/Modal";
import _ from "lodash";
import moment from "moment";
import { useAppState } from "../../../Context/appStateContext";
import TerminalPayment from "./TerminalPayment";
import KeyboardComponent from "../../../Components/Keyboard";
import { useSockeState } from "../../../Context/webSocketContext";

//Generujemy array dla react select ze wszystkimi opcjami
  const numberRange = (start, end) => {
    return new Array(end + 1 - start).fill().map((d, i) => ({
      label: i + start,
      value: i + start,
    }));
  };

  //Otrzymujemy liczbe dni w miesiacu
  const getDays = (year, month) => {
    return new Date(year, month+1, 0).getDate();
  };

export default function PrepaymentModal({ isOpen, closeModal, data }) {
  //Stany
  const maxDate =  data?.allCurrentReservations.length > 0 ? new Date(
    Math.max(
      ...data?.allCurrentReservations?.map(element => {
        return new Date(element.toDate);
      }),
    ),
  ) : new Date()
  
  const currentDate = new Date() > maxDate ? new Date() : maxDate
  const addHoureToTimer = useRef()
  const [transactionData, setTransactionData] = useState();
  const { userData, setErr } = useAppState();
  const { sendRequestToEcr } = useSockeState();
  const [monthTicketWarning, setWarning] = useState(false)
  const [parkingPrice, setParkingPrice] = useState(0);

  const [idDocument, setDocument] = useState(data?.identityDocument ? data?.identityDocument : '')
  //Stan Daty
  const [toDate, setToDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth()+1,
    year: currentDate.getFullYear(),
  });
  const [numberOfDaysBetween, setNumberOfDays] = useState(0)
  //Tablica z ilością dni, miesiecy, lat
  const [initialDateObjects, setNumberDays] = useState({
    Day: numberRange(
      currentDate.getDate(),
      getDays(currentDate.getFullYear(), currentDate.getMonth()+1)
    ),
    Month: numberRange(currentDate.getMonth()+1, 12),
    Year: numberRange(currentDate.getFullYear(), currentDate.getFullYear()),
  });
  //Stan godzin
  const [time, setTime] = useState(moment().hour() + ':' + moment().minutes());
  //Zmienna do wykluczania wyswietlanego czasu, jezeli jest 12.30 tego samego dnia to godziny 11,10,9,8 itd są wyłączone tak samo minuty
  const [timeitData, setTimeItData] = useState({
    h: [],
    m: [],
  });

  useEffect(() => {
    if(monthTicketWarning && !data.identityDocument) setErr({title:"Informacja", msg:"Uwaga kupujesz bilet miesięczny zgodnie z regulaminem musisz podać numer dokumentu tożsamości", status:"warrning"})
  }, [monthTicketWarning])

  useEffect(() => {
    var a = moment(`${toDate.year}-${toDate.month}-${toDate.day}`);
    var b = moment().format("YYYY-MM-DD HH:mm:00");
    const days = a.diff(b, 'days')
    setNumberOfDays(days)
    if(days >= 30){
      setWarning(true)
    }else {
      setDocument('')
    }
  }, [toDate,time])

  //?     Tu zaczyna się logika obsługi daty
  useEffect(() => {
    const numberOfDays = getDays(currentDate.getFullYear(), toDate.month);
    //Obliczamy liczbe dni dla miesiaca
    const daysToArray =
      toDate.month == currentDate.getMonth()+1
        ? numberRange(currentDate.getDate(), numberOfDays)
        : numberRange(1, numberOfDays);

    setNumberDays((p) => ({ ...p, Day: daysToArray }));
    /* Kiedy uzytkownik zmienia miesiac i dzien a nastepnie powroci do poprzedniego miesiaca
        moze sie zdarzyc ze obecny miesiac nie ma tylu dni wiec trzeba zmienic dzien
        */
    if (daysToArray.length >= toDate.day)
      setToDate((p) => ({ ...p, day: initialDateObjects.Day[0].value }));
  }, [toDate.month]);

  //Pola które chcemy wyrenderować
  const DateFields = ["Day", "Month", "Year"];
  //Zamiana na Polski
  const changeEnglishToPolish = (n) => {
    if (n === "Day") return "Dzień";
    if (n === "Month") return "Miesiąc";
    if (n === "Year") return "Rok";
  };
  //Generujemy pola Dzien, Miesiac, Rok
  /*Nazwa pola jest zalezna od nazwy stanu initialDateObjects np Day dlatego 
    zmieniamy pozniej na lowercase aby zmienic stan w toDate
    */
  const GenerateField = ({ DateFields, initialDate, setDate }) =>
    DateFields.map((item, index) => {
      const a = initialDate[item];
      return (
        <div className="w-full m-2 text-center" key={item}>
          <h5 className="text-lg font-semibold text-slate-900 mb-1">
            {changeEnglishToPolish(item)}
          </h5>
          <Select
            onChange={({ value }) =>
              setDate((p) => ({ ...p, [item.toLowerCase()]: value }))
            }
            className="basic-single"
            isSearchable={false}
            options={a}
            defaultValue={a[0]}
            /*Aby ustawić stan musimy go znalezc w tablicy a ze React select trzyma stany jako obkiekt {label:'', value:''}
                    to musimy go znalezc po value
                    */
            value={a.find((i) => i.value === toDate[item.toLowerCase()])}
          />
        </div>
      );
    });


  //? Tu zaczyna się logika obsługi czasu
  //Wywalamy godziny i minuty
  useEffect(() => {
    const month = currentDate.getMonth()+1;
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    if (day === toDate.day && month === toDate.month) {
      setTime(`${hour}:${minutes}`)
      setTimeItData({
        h: _.range(0, 23, 1).filter((o) => !_.range(hour, 24, 1).includes(o)),
        m: _.range(0, 60, 1).filter(
          (o) => !_.range(minutes, 60, 1).includes(o)
        ),
      })
    } else {
      setTimeItData({
        h: [],
        m: [],
      });
    }
  }, [toDate]);

  const changeTime = (t) => {
    //To jest string
    //currentTime[0] to godzina
    const currentTime = t.split(':')
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const month = currentDate.getMonth()+1;
    const day = currentDate.getDate()
    if(parseInt(currentTime[0]) === hour && month === toDate.month && day === toDate.day){
        setTimeItData({
            h: _.range(0, 24, 1).filter((o) => !_.range(hour, 24, 1).includes(o)),
            m: _.range(0, 60, 1).filter(
              (o) => !_.range(minutes, 60, 1).includes(o)
            ),
          })
    }else{
      setTimeItData(p=> ({...p, m:[] }))
    }
    setTime(t)
  };

  //Zmiana czasu po naciśnięciu przycisków z godzinami
  const changeTimeOnButton = (v) => {
    const currentSelectedTime = time.split(':')
    const currentTime = moment([toDate.year, toDate.month, toDate.day,currentSelectedTime[0],currentSelectedTime[1] ])
    currentTime.add(v, 'hour')
    addHoureToTimer.current.addHour(v)
    setToDate({
        day:currentTime.date(),
        month:currentTime.month(),
        year:currentTime.year()
    })
    setTime(currentTime.hour() + ":" + currentTime.minutes())
  }

  //?Requesty 
  useEffect(() => {
    checkParkingPrice()
  }, [toDate, time])

  const checkParkingPrice = () => {
      //Sprawdzamy cene za parking
      //Zaczynamy od daty stworzenia sesji 
      const formDate = toDate.year + "-" + toDate.month + "-" + toDate.day
      getParkingPrice({
          parkingId:data.parkingId,
          dateTimeFrom: currentDate,
          dateTimeTo: formDate + " " + time + ":00"
      })
      .then((data) => setParkingPrice(data.calculatedReservationPrice100/100))
  }

  const makePayment = async () => {
    try{
      if(parkingPrice <= 0){
        return setErr({title:"Parking", msg:"Twoja sesja jest darmowa"})
      }
      if(idDocument.length <= 0 && numberOfDaysBetween >= 30){
        return setErr({title:"Sesja", msg:"Musisz podać numer dokumentu tożsamości"})
      }
      const formDate = moment(`${toDate.year}-${toDate.month}-${toDate.day}`).format('YYYY-MM-DD')
      await prePayment({
        dateTimeTo: `${formDate} ${time}:00`,
        dateTimeFrom:currentDate,
        qrValueRowId:userData?.overridingSessionObject?.uniqueQrCodeRowId,
        userId:userData?.overridingSessionObject?.userId,
        idDocument: idDocument.length > 0 ? idDocument : null,
        paymentTargetRecordId:userData?.overridingSessionObject?.id,
        paymentTargetRecordName:"prepayment",
        sessionId:userData?.overridingSessionObject?.id,
      })
      .then((res) => {
        sendRequestToEcr.pay(res.totalSessionsPriceToPay100/100)
        return setTransactionData(res)
      })
      .catch(() => setErr({title:'Błąd', msg:'Nie mozna opłacić'}))
    }catch(err){
      console.log(err)
      return setErr({title:"Bład Serwera", msg:"Przepraszamy ale nie mozna wykonać tej operacji"})
    }
  }
  
  //Key pozwala reactowi się zorientować ze to inny modal bylo to wymagane bo event czeka na klikniecie i zamyka
  //Modala jezeli otwieramy nowy modal react rerenderuje jedynie srodek a nie calego modala
  //Aby zamknac modala do oplaty nalezy usunac dane tranzakcji
  if(!!transactionData){
    return(
    <Modal key={1} disableModalClosing={true} isOpen={isOpen}>
      <div className="p-10 text-center">
        <TerminalPayment transactionId={transactionData.createdTransactionRowId} onClose={() => setTransactionData()}/>
      </div>
    </Modal>
    )
  }

  return (
    <>
    <Modal key={2} isOpen={isOpen} onClose={closeModal}>
      <div className="p-5 text-center">
        <div className="flex ">
          <GenerateField
            DateFields={DateFields}
            initialDate={initialDateObjects}
            setDate={setToDate}
          />
        </div>
        <div className="flex justify-center m-4">
          {/*Zmiana koloru zegarka jest w index.css  --timeit-primary-color */}
          <Timeit
            start={1}
            hourExclude={timeitData.h}
            minuteExclude={timeitData.m}
            onChange={(value) => changeTime(value)}
            ref={addHoureToTimer}
          />
        </div>
        <div className="flex justify-evenly text-white">
          {[1, 2, 3, 5].map((value) => {
            return (
              <button onClick={() => {
                changeTimeOnButton(value)}} className="w-16 h-16 rounded-full border-2 bg-fuchsia-500">
                {`${value}h`}
              </button>
            );
          })}
        </div>
        {numberOfDaysBetween >= 30 && 
        <div className="mt-2 text-lg font-semibold">
          <h1 className="my-2">Podaj numer dokumentu tożsamości</h1>
          <input
            id="qrInput"
            value={idDocument} onChange={(e) => setDocument(e.target.value)}
            className="bg-gray-200 border border-gray-300 text-white-900 
                text-xl text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 
                block max-w-lg w-full m-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        }
        <h5 className="mt-2 text-lg font-semibold">
          Opłata za parking wyniesie:
        </h5>
        <h6 className="mb-2 text-lg font-semibold">{parkingPrice}zł</h6>
        <button onClick={makePayment} className="flex-none w-full h-12 uppercase font-medium tracking-wider bg-green-600 text-white">
          Zapłać
        </button>
      </div>
      {numberOfDaysBetween >= 30 && <KeyboardComponent onChange={setDocument} value={idDocument} />}
    </Modal>
    </>
  );
}
