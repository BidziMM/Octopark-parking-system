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
config = {
    bufforTime: 30,
    qrCodeSize: 512,
    domain: 'https://backend.octopark.io',
    printServer:"http://54.38.50.145:5050",
    mercury:'http://5026d512-a20c-4504-b63f-679cae0010ef.mercure.rocks/.well-known/mercure?topic=',
    tagId: urlParams.get('tagId') ? urlParams.get('tagId')  : "",
    parkingId: urlParams.get('parkingId') ? urlParams.get('parkingId') : 0,
    lprAuthCode: urlParams.get('authcode') ? urlParams.get('authcode') : "34523025be8454f96fda9cf414c54fd6",
    isOutgoing: urlParams.get('isOutgoing') ? urlParams.get('isOutgoing') : false,
    isEntrance: urlParams.get('isEntrance') ? urlParams.get('isEntrance') : false,
    dev:true
}


const {
    bufforTime,
    qrCodeSize,
    domain,
    tagId,
    parkingId,
    lprAuthCode,
    isOutgoing,
    isEntrance,
    mercury,
    printServer,
    dev
} = config

export {
    bufforTime,
    qrCodeSize,
    domain,
    tagId,
    parkingId,
    lprAuthCode,
    isOutgoing,
    isEntrance,
    mercury,
    printServer,
    dev
}

// parkingId : 35,
// lprAuthCode : "e465b3de97ab4eff462f40928f430433",