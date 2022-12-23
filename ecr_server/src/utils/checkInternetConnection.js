const axios = require('axios')

const {uploadLogsToCloude} = require('../services/sendLogs')

//Sprawdza połączenie z siecią jezeli jest to wywołuje funkcję wysyłającą logi do serwera
const isInternet = () => {
    axios ('http://127.0.0.1:8001/health')
    .then(() => {
        uploadLogsToCloud('terminalLogs')
    })
    .catch(() => {
        console.log("Connection with server lost")
    });
}

const eventOnCloudeServerConnectionLost = () => setInterval(isInternet, 1000 * 60);

module.exports = eventOnCloudeServerConnectionLost



