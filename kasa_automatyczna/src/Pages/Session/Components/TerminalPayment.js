import React, {useState, useEffect} from 'react'
import {
    useNavigate,
    Link
  } from 'react-router-dom';
import {EventEmitter} from 'fbemitter'
import ClockLoader from "react-spinners/ClockLoader";
import {payForParking} from '../../../Api/Payment'
import {SiContactlesspayment} from 'react-icons/si'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {BiErrorCircle} from 'react-icons/bi'
import { useSockeState } from '../../../Context/webSocketContext';
export default function TerminalPayment({transactionId, onClose}) {
    const { sendRequestToEcr,reactEmitter } = useSockeState();
    const countDownToChangeScreen = 7
    const [startPayment, setStartPayment] = useState(false)
    const [endPayment, setEndPayment] = useState(false)
    const [endError, setPaymentError] = useState(false)
    const [backToScreenCount, setBackToScreenCount] = useState(countDownToChangeScreen)
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        let timeout;
        if(endPayment && !endError)
        interval = setInterval(() => {
            setBackToScreenCount(p => p - 1)
        }, 1000);
        if(endPayment && endError)
        timeout = setTimeout(() => onClose(), 3000)
      return () => {
        clearInterval(interval);
        clearTimeout(timeout)
      }
    }, [endPayment])
    
    useEffect(() => {
        const timeout = reactEmitter.addListener('e', (data) => {
            switch(data.event){
                case 'processingPayment':
                    setPaymentError(false)
                    setEndPayment(false)
                    setStartPayment(true)
                    break
                case 'paymentAccepted':
                    setEndPayment(true)
                    break
                case 'paymentDenied':
                    setPaymentError(true)
                    setEndPayment(true)
                    break                    
            }
        });
        return () => {
            timeout.remove()
        }
    }, [])

    useEffect(() => {
        if(backToScreenCount === 0) navigate('/')
    }, [backToScreenCount])

    const pay = () => {
        setStartPayment(true)
        setTimeout(() => {
            payForParking({
                transactionId,
                paymentTargetRecordName: "prepayment"
            })
            .finally(() => {
                setEndPayment(true)
            })
        }, 2000)
    }
    const paymentError = () => {
        setStartPayment(true)
        setTimeout(() => {
            sendRequestToEcr.payError()
            .finally(() => {
                setEndPayment(true)
            })
        }, 2000)
        
    }

    const startPaymentProcess = () => {
        setPaymentError(false)
        setEndPayment(false)
        setStartPayment(false)
    }

    
    const abortTransaction = () => {
        sendRequestToEcr.abort()
        onClose()
    }

    const StartProcessing = () => {
        return(
             <div>
                {!startPayment && <SiContactlesspayment className='m-auto' size={128}/>}
                {startPayment && <h1 className='text-xl font-bold mb-4'>Przetwarzanie</h1>}
                <ClockLoader
                    size={128}
                    color={"#ca03a4"}
                    loading={startPayment && !endPayment}
                    speedMultiplier={1.5}
                    className="m-auto"
                />
                {!startPayment && 
                <>
                    <h1 className='text-xl font-bold my-4'>
                        Zapłać używając terminalu
                    </h1>
                    <button onClick={pay} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-base">
                        Zapłać
                    </button>
                    <button onClick={paymentError} className="w-full inline-flex my-4 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-base">
                        Zapłać nieprawidłowo dev
                    </button>
                    <button onClick={abortTransaction} className="w-full my-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-base">
                        Anuluj
                    </button>
                    </>
                }

             </div>
        )
    }

    const SuccessProcessing = () => {
        return(
            <div>
                <AiOutlineCheckCircle color='green' className='m-auto' size={128} />
                <h1 className='text-xl font-bold my-4'>
                    Dziękujemy za płatność. Możesz opuścić parking
                </h1>
                <div>
                    <h1>Powrót do ekranu za:</h1>
                    <h1>{backToScreenCount}</h1>
                </div>
                <Link to={'/'}>
                    <button className="w-full my-4 h-10 px-6 mt-4 font-semibold rounded-md bg-black text-white">
                        Powrót do menu
                    </button>
                </Link>
            </div>
        )
    }

    const FaileProcessing = () => {
        return(
            <div>
                <BiErrorCircle color='red' className='m-auto' size={128} />
                <h1 className='text-xl font-bold my-4'>
                    Błąd podczas płatności. Spróbuj ponownie.
                </h1>
            </div>
        )
    }

  if(startPayment && endPayment && endError === false) return <SuccessProcessing/>
  if(startPayment && endPayment && endError) return <FaileProcessing/>
  return <StartProcessing/>
}
