const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const axios = require('axios')
const {join,dirname }= require('path')

const file = join(__dirname, 'logs.json')

const adapter = new FileSync('logs.json')
const db = low(adapter)

db.defaults({ terminalLogs:[] }).write()

//Funkcja która wysyła logi do serwera
const sendLogsToCloudeDatabase = async (data) => {
    try{
        await axios.post('http://127.0.0.1:8001/log/collect', {
            obj:{data}})
    }catch(err){
        if(err.request){
            console.log(err)
            saveDataLocally(data)
        }
       
    }
    
}

//Zapisywanie danych do lokalnej bazy danych
const saveDataLocally = (data) => {
    db.get('terminalLogs')
    .push(data)
    .write()
}

//Wysyła wszystkie logi do serwera a następnie usuwa z lokalnej bazy danych
const uploadLogsToCloud = async (nameOfLogs) => {
    try{
        const data = db.get(nameOfLogs)
        if(data.lenght <= 0){
            return
        }
        await axios.post('http://127.0.0.1:8001/log/collect', {
            obj:data
        })
        db.get('terminalLogs')
        .remove()
        .write()
    }catch{
        console.log("can not upload logs to server")
    }
}


module.exports = {sendLogsToCloudeDatabase, uploadLogsToCloud}