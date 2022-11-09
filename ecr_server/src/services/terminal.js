const net = require("net");
const {ecrCommends, terminalResponse} = require("../utils/ecrCommends")
const util = require('util');
const decoder = new util.TextDecoder();

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')

const SingletonSocket = {
  _instance: null,

  initConnection() {
    const HOST = "192.168.1.50";
    const PORT = 8282;
    const client = new net.Socket();
    client.connect({ port: PORT, host: HOST, keepAlive: true }, () => {
      console.log("conected")
    });
    client.on("data", function (data) {
      console.log("Terminal: " + data.toString());
      TerminalService.terminalResponse(data.toString())
    });
    client.on("connect", function (stream) {
      console.log("Connection" + stream);
    })
    client.on("error", function (err) {
      console.log("Connection" + err);
    });
    client.on("close", function (e) {
      console.log("Connection closed ");
      SingletonSocket._instance = null
    });
    client.on("drain", function (e) {
      console.log(e);
    });
    return client
  },

  get instance () {
    if (!this._instance) {
      this._instance = this.initConnection()
    }
    return this._instance;
  }
}

class TerminalService {
  async handlingEvents(socket) {}

  //Przetłumaczenie wiadomości 
  translateString(str){
    let s = [];
    s.push(0)
    s.push(str.length)
    Array.from(str).forEach((_,index) => {
      const uni = str.charCodeAt(index)
      s.push(uni)
    })
    return new Uint8Array(s)
  }

  async send(string) {
    const commend = this.translateString(string);
    const client = SingletonSocket.instance
    client.write(commend)
  }

  hello() {
    this.send(
      ecrCommends.hello
    );
  }

  payment(value) {
    value = (value * 100).toString();
    const paymentValue = value.padStart(12, "0");
    this.send(ecrCommends.payment(paymentValue));
    //this.send("|2881111|")
  }
  abortTransaction() {
    this.send(ecrCommends.abortTransaction);
  }

  blikReturnOption(value) {
    this.send(ecrCommends.blikReturnOption[value]);
  }

  generateRaport() {
    this.send(ecrCommends.raport);
  }

  //Dev functions
  devAccept(){
    myEmitter.emit('terminalEvent', '2820010,003,ZGODA')
  }
  devReject(){
    myEmitter.emit('terminalEvent', '2820010,003,ODMOWA')
  }

  //Get status code from terminal response
  static terminalResponse(res){
    var mySubString = res.substring(
      res.indexOf("|") + 1, 
      res.lastIndexOf("|")
    ).split('|');
    myEmitter.emit('terminalEvent', mySubString)
  }
}

module.exports = TerminalService
