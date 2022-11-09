import React from 'react'
import Modal from '../../../Components/Modal';
import hourglassIco from '../../../Assets/hourglass.png'
import confirmationIco from '../../../Assets/confirmation.png';
import { useSnackbar } from 'notistack';

export default function PaymentBalanceModal({data, closeModal, isOpen}) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const displaySnack = (message, variant) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 7000, preventDuplicate: true })
    }
  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()}>
        <div
        style={{
            margin: 20,
            borderRadius: 20,
            padding: 25,
            width: '90%',
            shadowColor: '#000',
        }}
        >
        <h1
            style={{
            marginBottom: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            Bilans płatności
        </h1>

        <div
            style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            <div
            style={{
                display:'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingTop: 15,
                paddingBottom: 15,
            }}
            >
            <span style={{ flex: 7 }}>Koszt parkowania:</span>
            <span style={{ flex: 3 }}>
                {data.overridingSessionObject.totalSessionsPrice100 / 100}
                PLN
            </span>
            </div>

            {data.overridingSessionObject.transactionsLinkedWithSessionArray.length > 0 ? (
            <div
                style={{
                display:'flex',
                flexDirection: 'row',
                backgroundColor: '#f3f3f3',
                paddingTop: 15,
                paddingBottom: 15
                }}
            >
                <span style={{ flex: 7 }}>data operacji</span>
                <span style={{ flex: 3 }}>wartość</span>
                <span style={{ flex: 1 }}>&nbsp;</span>
            </div>
            ) : (
            <div
                style={{
                display:'flex',
                flexDirection: 'row',
                backgroundColor: '#f3f3f3',
                paddingTop: 15,
                paddingBottom: 15,
                }}
            >
                <span style={{ flex: 7 }}>brak operacji</span>
            </div>
            )}

            {data.overridingSessionObject.transactionsLinkedWithSessionArray.map(item => (
            <div style={{ display:'flex', flexDirection: 'row', marginTop: 26 }}>
                <span style={{ flex: 7 }}>{item.transactionDate}</span>
                <span style={{ flex: 3 }}>-{item.price100 / 100} PLN</span>
                <div style={{ flex: 1 }}>
                {item.isSuccessfullyPaid ? (
                    <button
                    onClick={() => {
                        displaySnack('Płatność jest pomyślnie zaksięgowana i ujęta w bilansie', 'success' );
                    }}
                    >
                    <img
                        style={{
                        resizeMode: 'contain',
                        height: 20,
                        width: 20,
                        marginBottom: 0,
                        }}
                        src={confirmationIco}
                    />
                    </button>
                ) : (
                    <button
                    onClick={() => {
                        displaySnack('Wciąż czekamy, aż operator płatności potwierdzi transakcję. Jeżeli płatność nie doszła do skutku - wykonaj ją ponownie.', 'warning' );
                    }}
                    >
                    <img
                        style={{
                        resizeMode: 'contain',
                        height: 20,
                        width: 20,
                        marginBottom: 0,
                        }}
                        src={hourglassIco}
                    />
                    </button>
                )}
                </div>
            </div>
            ))}

            <div
            style={{
                display:'flex',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingTop: 25,
                paddingBottom: 15,
            }}
            >
            <span style={{ flex: 7 }}>Pozostało do zapłacenia:</span>
            <span style={{ flex: 3 }}>
                {data.overridingSessionObject.totalSessionsPriceToPay100 / 100}
                PLN
            </span>
            <span style={{ flex: 1 }}/>
            </div>
        </div>

        <div style={{ height: 30 }} />
        <button onClick={closeModal} className='w-full bg-green-500 p-4 rounded-lg text-white text-lg font-bold'>Zamknij</button>
        </div>
  </Modal>
  )
}
