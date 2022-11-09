import axios from 'axios'
import { parkingId, domain } from '../Config'

export const getSessionIdByNumberPlate = ({
    numberPlate,
  }) => {
    return axios.post(`${domain}/consumer/session/number-plate`, {
        obj: {
          numberPlate,
          parkingId
        }
      })
    .then(res => res.data)
    .catch((err) => {
        throw new Error(err)
    })
  };

export const getUserSession = ({
    sessionId,
  }) => {
    return axios.post(`${domain}/consumer/my-active-sessions`, {
        obj: {
            sessionId
        }
      })
    .then(res => res.data)
    .catch((err) => {
        throw new Error(err)
    })
  };

