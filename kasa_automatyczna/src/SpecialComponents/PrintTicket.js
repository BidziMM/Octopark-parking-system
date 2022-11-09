import React, { useState, forwardRef, useImperativeHandle } from "react";
import ModalError from "../Components/ModalError";
import { printRequest } from "../Api/Special";
const PrintTicketComponent = forwardRef(
  ({
    qrValue,
    dataFrom,
    dataTo,
    allTransactions,
    price,
    ticketType,
    idDocumentNumber,
    parkingName,
  },
    ref
  ) => {
    const [printError, setPrintError] = useState(false);
    useImperativeHandle(ref, () => ({
      PrintTicket,
    }));
    const PrintTicket = () => {
      printRequest({      
        qrValue,
        dataFrom,
        dataTo,
        allTransactions,
        price,
        ticketType, 
        idDocumentNumber,
        parkingName
      })
        .then(() => setPrintError(false))
        .catch((err) => {
          console.log(err)
          setPrintError({title:"Drukarka", msg:"Nie mozna wydrukować biletu spróbuj ponownie lub skontaktuj się z właścicielem parkingu"})
        });
    };

    if (printError) {
      return <>
        <ModalError err={printError} isOpen={!!printError} status={printError} closeModal={() => setPrintError()}/>
        <button onClick={PrintTicket}>Drukuj</button>
      </>
    }else{
      return null
    }
  }
);

export default PrintTicketComponent;
