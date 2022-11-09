import axios from "axios";
import { printServer, domain } from "../Config";

export const printRequest = ({
  qrValue,
  dataFrom,
  dataTo,
  allTransactions,
  price,
  ticketType,
  idDocumentNumber,
  parkingName,
}) => {
  console.log(printServer)
  return axios
    .post(`${printServer}/print`, {
      qrValue,
      dataFrom,
      dataTo,
      allTransactions,
      price,
      ticketType,
      idDocumentNumber,
      parkingName,
    })
    .then((res) => res.data)
    .catch((err) => {throw err})
};
