import {getSettings} from './Api'
let config;
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//     console.log("dev")
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     config = {
//         bufforTime: 30,
//         qrCodeSize: 512,
//         domain: 'https://127.0.0.1:8001',
//         printServer:"https://127.0.0.1:5000",
//         mercury:'http://127.0.0.1:9001/.well-known/mercure?topic=',
//         tagId: urlParams.get('tagId') ? urlParams.get('tagId')  : "",
//         parkingId: urlParams.get('parkingId') ? urlParams.get('parkingId') : 0,
//         lprAuthCode: "34523025be8454f96fda9cf414c54fd6",
//         isOutgoing: urlParams.get('isOutgoing') ? urlParams.get('isOutgoing') : false,
//         isEntrance: urlParams.get('isEntrance') ? urlParams.get('isEntrance') : false,
//     }
// }else {
//     config = {
//         bufforTime: 30,
//         qrCodeSize: 512,
//         domain: 'https://backend.octopark.io/',
//         printServer:"http://127.0.0.1:5000",
//         mercury:'http://127.0.0.1:9001/.well-known/mercure?topic=',
//         tagId: "in1",
//         parkingId: 33,
//         lprAuthCode: "34523025be8454f96fda9cf414c54fd6",
//         isOutgoing: true,
//         isEntrance: true
//     }
// }
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
class Settings{
    constructor(){
        this.bufforTime = 30
        this.qrCodeSize = 512
        //domain= 'https=//backend.octopark.io'
        this.domain= 'http://localhost:8001'
        //printServer:"http://54.38.50.145:5050"
        this.printServer="http://localhost:5050"
        this.mercury='http://5026d512-a20c-4504-b63f-679cae0010ef.mercure.rocks/.well-known/mercure?topic='
        this.inveoUrl = ''
        this.automaticRelease = -1
        this.tagId = urlParams.get('tagId') ? urlParams.get('tagId')  : ""
        this.parkingId = urlParams.get('parkingId') ? urlParams.get('parkingId') : 0
        this.lprAuthCode = urlParams.get('authcode') ? urlParams.get('authcode') : "34523025be8454f96fda9cf414c54fd6"
        this.isOutgoing = urlParams.get('isOutgoing') ? urlParams.get('isOutgoing') : false
        this.isEntrance = urlParams.get('isEntrance') ? urlParams.get('isEntrance') : false
        this.dev = true
    }
    exportFields = () => {
        return {...this}
    }
    downloadSettings = async () => {
        getSettings(this.lprAuthCode)
        .then((data) => {
            for (const [key, value] of Object.entries(data)) {
                this[key] = value
              }
        })
        .catch((e) => {
            throw new Error("Dane nie zostały pobrane")
        })
    }
}

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// config = {
//     bufforTime: 30,
//     qrCodeSize: 512,
//     //domain: 'https://backend.octopark.io',
//     domain: 'http://localhost:8001',
//     //printServer:"http://54.38.50.145:5050",
//     printServer:"http://localhost:5050",
//     mercury:'http://5026d512-a20c-4504-b63f-679cae0010ef.mercure.rocks/.well-known/mercure?topic=',
//     inveoUrl:'',
//     automaticRelease: -1,
//     tagId: urlParams.get('tagId') ? urlParams.get('tagId')  : "",
//     parkingId: urlParams.get('parkingId') ? urlParams.get('parkingId') : 0,
//     lprAuthCode: urlParams.get('authcode') ? urlParams.get('authcode') : "34523025be8454f96fda9cf414c54fd6",
//     isOutgoing: urlParams.get('isOutgoing') ? urlParams.get('isOutgoing') : false,
//     isEntrance: urlParams.get('isEntrance') ? urlParams.get('isEntrance') : false,
//     dev:true
// }

const instance = new Settings();

export default instance;

// parkingId : 35,
// lprAuthCode : "e465b3de97ab4eff462f40928f430433",