const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('printOption'))
let homepage;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    homepage = '/'
} else {
    // production code
    homepage = '/home/pi/apki/kasa/build/'
}
const parkingId = 33,
    specialContexts = ["park_and_ride_torun"],
    printServer = 'http://54.38.50.145:5050',
    domain = 'https://backend.octopark.io',//'http://127.0.0.1:8001',
    websocketUrl = "ws://54.38.50.145:5002",
    printOption = urlParams.has('printOption') ? (urlParams.get('printOption') === 'true') : true,
    hideInput = urlParams.has('hideInput') ? urlParams.get('hideInput') : false,
    dev = true

export {homepage, parkingId, specialContexts,printServer, domain,websocketUrl, dev,hideInput, printOption}

