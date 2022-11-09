const TerminalService = require('../services/terminal')
const terminal = new TerminalService()

//Eventy obsłuiwane przez serwer i wysyłane do terminalu
const ecrEvents = ({event,value}) => {
    switch(event){
        case commends.hello:
            terminal.hello()
            break
        case commends.pay:
            terminal.payment(value)
            break
        case commends.blikReturnOption:
            terminal.blikReturnOption(value)
            break
        case commends.generateRaporte:
            terminal.generateRaport()
            break
        case commends.abortTransaction:
            terminal.abortTransaction()
            break
        case dev.accept:
            terminal.devAccept()
            break
        case dev.reject:
            terminal.devReject()
            break    
    }
}

const commends = {
    pay:"pay",
    hello:"hello",
    blikReturnOption:"blikReturnOption",
    generateRaporte:"generateRaporte",
    abortTransaction:"abortTransaction"
}
//Dev commends
const dev = {
    accept:"accept",
    reject:"reject"
}

module.exports = { ecrEvents, commends, dev }
