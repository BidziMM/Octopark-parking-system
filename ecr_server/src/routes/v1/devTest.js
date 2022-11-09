const express = require('express');

const router = express.Router();
const controller = require('../../controller/terminal.controller')

const {sendLogsToCloudeDatabase }= require('../../services/sendLogs')


router.route('/sendLogs').post((req,res) => {
    const data = {
        "terminalMessage":"|2841111|0|||||0|0152|1C10001F54726F6666656520427573696E65737320536F6C7574696F6E7320422E562E1C1100033130321C120013323031392F30392F31392031323A34333A30301C19000730303436303130|",
        "decodedMessage":{
            "msg":"hello"
        },
        "parkingId":33,
        "device":"in1",
        'terminalStatusCode':2841111,
        'sessionId':10
    }
    sendLogsToCloudeDatabase(data)
    return res.status(200).send()
});

module.exports = router;