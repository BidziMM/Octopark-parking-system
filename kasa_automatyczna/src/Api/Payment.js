import axios from "axios";
import { domain } from "../Config";

export const prePayment = ({
  dateTimeFrom,
  dateTimeTo,
  sessionId,
  userId,
  idDocument,
  paymentTargetRecordId,
  paymentTargetRecordName
}) => {
  return axios.post(`${domain}/consumer/transactions/prepayment`, {
      obj: {
          dateTimeFrom,
          dateTimeTo,
          sessionId,
          paymentTargetRecordId,
          paymentTargetRecordName,
          userId,
          idDocument,
      }
    })
  .then(res => res.data)
  .catch((err) => {
      throw new Error(err)
  })
}

export const handlePayment = ({
    paymentOption,
    paymentTargetRecordId,
    paymentTargetRecordName,
    requestInvoice,
    anonymousUser,
    sessionId,
    idDocument
  }) => {
    return axios.post(`${domain}/consumer/transactions/new`, {
        obj: {
          paymentOption,
          paymentTargetRecordId,
          paymentTargetRecordName,
          requestInvoice,
          anonymousUser,
          sessionId,
          idDocument
      },
      })
        .then(res=> res.data)
        .catch(err => {throw(err)})
  };

  export const payForParking = ({
    transactionId,
    paymentTargetRecordName
  }) => {
    return axios.post(`${domain}/payment-provider/terminal`, {
        obj: {
          transactionId,
          paymentTargetRecordName
        },
      })
        .then(res => res.data);
  };

  export const getParkingPrice = ({
    dateTimeFrom,
    dateTimeTo,
    parkingId,
  }) => {
    return axios.post(`${domain}/pricing/calculate-reservation-price100`, {
        obj: {
          dateTimeFrom,
          dateTimeTo,
          parkingId
        }
      })
        .then(res => res.data);
  };