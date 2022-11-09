const express = require('express')
const app = express()
const cors = require('cors')
const port = 5050 || env.port
const printer = require('./printer')

app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.post('/print', async (req, res) => {
    try{
        if(!req.body.qrValue) throw new Error("Brak kodu qr")
        await printer(req.body.qrValue)
        return res.sendStatus(200);
    }catch{
        return res.sendStatus(500);
    }
})

app.post('/printerror', async (req, res) => {
    try{
        throw new Error()
    }catch{
        return res.sendStatus(500);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})