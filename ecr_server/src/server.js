const express = require('express');
const cors = require('cors');
const routes = require('./routes/v1');
const WebSocketService = require('./services/websocket')
const app = express();
const EventEmitter = require('events');
const {ecrEvents} = require('./utils/commendsEntity')
const {terminalResponse} = require('./utils/ecrCommends')
const ErrorHandler = require('./middlewares/error')
const testPrinter = require("./services/printer")
const eventOnCloudeServerConnectionLost = require('./utils/checkInternetConnection')
const t = require('./utils/transleateTerminalMessage')
require('dotenv').config();



const port = process.env.port ? env.port : 5001

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// api do testowania
app.use('/v1', routes);

//Inicjalizacja serwera websocket do komunikacji między kioskiem a serwerem (Warstwa abstrakcji do komunikacji między terminalem a kioskiem)
WebSocketService.init()

app.use(ErrorHandler)

app.listen(port, () => console.log(port))

//Obsługa eventu zwązanego z wysyłaniem danych do serwera kiedy pojawi się połączenie
eventOnCloudeServerConnectionLost()

//Globalny emiter do obłusgi eventów z terminalu
const myEmitter = new EventEmitter();
global.myEmitter = myEmitter;



myEmitter.on("clientEvent", (data) => {
    const jsonData = JSON.parse(data)
    ecrEvents({...jsonData})
})

myEmitter.on("terminalEvent", (data) => {
    const res = terminalResponse(data.toString())
    if(!!res) WebSocketService.sendMessage(res)
})

ecrEvents("hello")
testPrinter()