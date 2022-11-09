import React, {useState} from 'react';
import greenGradientBg from '../../../Assets/green_gradient_bg.png';
import paymentIco from '../../../Assets/payment_ico.png';
import { FaInfoCircle } from "react-icons/fa";
import PaymentBalanceModal from './PaymentBalanceModal';
import ParkinCostModal from './ParkinCostModal';

export default function PaymentBlock({ handleChange ,data ,runPaymentModal }) {
  const [modalControll, setModal] = useState({
    priceCalculationModalVisible:false,
    paymentBalanceModalVisible:false,
  })

  const modalState = (name) => {
    setModal(p => ({...p, [name]:!p[name]}))
  }

  return (
    <div
      style={{
        backgroundImage:`url(${greenGradientBg})`,
        borderRadius: 15,
        width: '100%',
        maxWidth:500,
        margin:"auto",
        height: 110,
        position: 'absolute',
        top: 250,
        left: 0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        }
      }}
      className="flex flex-col p-2"
    >
      
      <PaymentBalanceModal data={data} isOpen={modalControll.paymentBalanceModalVisible} closeModal={() => modalState('paymentBalanceModalVisible')}/>

      <ParkinCostModal data={data} isOpen={modalControll.priceCalculationModalVisible} closeModal={() => modalState('priceCalculationModalVisible')}/>

      <button
        onClick={() => {
          if (data.overridingSessionObject.isActive == true) {
            modalState('priceCalculationModalVisible')
          }
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: 14,
          }}
        >
          Koszt parkowania:
          {' '}
          <span style={{ fontWeight: 'bold' }}>{data.overridingSessionObject.totalSessionsPrice100 / 100}</span>
          {' '}
          <span style={{ fontSize: 12 }}>PLN</span>
        </span>
      </button>

      <div
        className="mt-1 w-full flex flex-row item-center justify-left"
      >
        <button
          onClick={() => modalState('paymentBalanceModalVisible')}
          className="flex-2 flex flex-col items-start justify-center ml-4"
        >
          <span
            style={{
              color: '#fff',
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            {data.overridingSessionObject.totalSessionsPriceToPay100 / 100}
            {' '}
            <span style={{ fontSize: 10, fontWeight: 'bold' }}>PLN</span>
          </span>

          <span className='flex items-center' style={{ fontSize: 9, fontWeight: 'bold', color: '#fff' }}>
            <FaInfoCircle className='mr-1' size={11} color="#fff" />
            Do zapłaty
          </span>
        </button>
      </div>
    </div>
  );
}
