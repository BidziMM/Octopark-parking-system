import React, {
    useState,
    useContext,
    useEffect,
    createContext,
  } from "react";
  import {EventEmitter} from 'fbemitter'
  import { websocketUrl } from "../Config";

  const WebSocketContext = createContext();
  const emiter = new EventEmitter()

  export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState();
    const [reactEmitter, setReactEmiter] = useState(emiter)


    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        const URL = websocketUrl
        setSocket(() => {
          const ws = new WebSocket(URL);
          ws.onmessage = (d) => {
            terminalEvent(d.data)
          }
          ws.onclose = () => {
            setSocket()
          }
          ws.onerror = () => {
            setSocket()
          };
          return ws;
        })
    }

    const socketEmit = (e, data) => socket.send(e, data)

    const sendRequestToEcr = {
        pay: (v) => socketEmit(JSON.stringify({event:"pay", value:v})),
        payError: (v) => socketEmit(JSON.stringify({event:"reject", value:v})),
        abort: () => socketEmit(JSON.stringify({event:"abortTransaction"}))
    }

    const terminalEvent = (e) => {
        const emit = (data) => reactEmitter.emit('e', data)
        switch (e){
            case "timeout":
                emit({event:'timeout'})
                break;

            case "processingPayment":
                emit({event:"processingPayment"})
                break;

            case "paymentAccepted":
                emit({event:"paymentAccepted"})
                break;

            case "paymentDenied":
                emit({event:"paymentDenied"})
                break;
        }
    }
    return (
      <WebSocketContext.Provider
        value={{
            socket,
            sendRequestToEcr,
            reactEmitter
        }}
      >
        {children}
      </WebSocketContext.Provider>
    );
  };
  
  export const useSockeState = () => useContext(WebSocketContext);