import axios from "axios";
import { tagId,parkingId,lprAuthCode, domain, printServer }  from './Config'

axios.defaults.withCredentials = false

export const printRequest = ({ qrValue }) => {
  return axios.post(`${printServer}/print`, {
    qrValue
  })
  .then((res) => res.data);
};

export const printDevError = () => {
  return axios.post(`${printServer}/printerror`)
  .then((res) => res.data);
} 

export const openColumnRequest = ({ qrValue }) => {
    return axios.post(`${domain}/consumer/parkings/columns/request-open-column-dynamic-qr-anonymous`, {
      obj:{
        lprAuthCode:lprAuthCode,
        parkingId:parkingId,
        tagId:tagId,
        uniqueAuthorisationCodeValue:qrValue
      },
    })
    .then((res) => res.data);
  };

export const getSession = ({ qrValue }) => {
    return axios.post(`${domain}/consumer/session/qr-code`,{
        obj:{
            'uniqueAuthorisationCodeValue':qrValue
        }
      }).then((res) => res.data)
}