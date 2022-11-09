const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors')
const port = 5050 || env.port
const printer = require('./printer')

app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

router.post('/print', async (req, res) => {
    try{
        if(!req.body.qrValue) throw new Error("Brak kodu qr")
        await printer(req.body.qrValue)
        return res.sendStatus(200);
    }catch{
        return res.sendStatus(500);
    }
})

router.post('/printerror', async (req, res) => {
    try{
        throw new Error()
    }catch{
        return res.sendStatus(500);
    }
})

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})