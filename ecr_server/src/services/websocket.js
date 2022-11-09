const { WebSocketServer } =  require('ws');

//Websocket w patternie singleton
class WebSocketService{
    constructor(){
        if(!!WebSocketService.instance){
            return WebSocketService.instance
        }
        WebSocketService.instance = this

        this.websocket = null;
        this.clients = new Map();

        return this;
    }
    init(){
        this.websocket = new WebSocketServer({
            port: 5002,
            perMessageDeflate: {
              zlibDeflateOptions: {
                // See zlib defaults.
                chunkSize: 1024,
                memLevel: 7,
                level: 3
              },
              zlibInflateOptions: {
                chunkSize: 10 * 1024
              },
              // Other options settable:
              clientNoContextTakeover: true, // Defaults to negotiated value.
              serverNoContextTakeover: true, // Defaults to negotiated value.
              serverMaxWindowBits: 10, // Defaults to negotiated value.
              // Below options specified as default values.
              concurrencyLimit: 10, // Limits zlib concurrency for perf.
              threshold: 1024 // Size (in bytes) below which messages
              // should not be compressed if context takeover is disabled.
            }
          });
          this.websocket.on('connection', (ws) => {
            this.clients.set(ws, {});

            //Wiadomość od clienta czyli kiostku jest przekazywana przez emiter 
            ws.on('message', function message(data) {
              console.log(data.toString())
              myEmitter.emit('clientEvent', data.toString())
            });

            ws.on("close", () => {
                this.clients.delete(ws);
            });  
          })
    }
    //Po pojawieniu się wiadomości z terminalu jest ona wysyłana do wszystkich klientów u nas i tak to będzie jeden kioska
    sendMessage(statusCode){
        [...this.clients.keys()].forEach((client) => {
            client.send(statusCode.toString());
        });
    }
}

const instance = new WebSocketService()

module.exports = instance