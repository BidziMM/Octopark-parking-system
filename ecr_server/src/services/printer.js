const {merchantSlipGenerator, testG} = require('../utils/ecrCommends')
const path = require('path')
var fs = require('fs')
const iconv = require('iconv-lite');
const QRCode = require('qrcode')

const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
//const device  = new escpos.USB();



//const options = { encoding: "852" /* default */ }
//const printer = new escpos.Printer(device, options);

// encoding is optional
const generateReceipt = (data) => {
    const d = merchantSlipGenerator(data)
    
}

const test = async () => {
    try{
    const data = '9F21031812079A032209121A0400104D696C6C656E6E69756D2044656269741A0500142A2A2A2A202A2A2A2A202A2A2A2A2032333133205F3401011A070001311A0800063631343230361A1B0003504C4E4F07A00000000310109F02060000000001008A0230301A0600014D1A0D00052A2A2F2A2A1A1C00195445524D494E414C20544553544F57592053454C46323030301A1D0015414C2E204A45524F5A4F4C494D534B4945203130301A1E001230302D38303720574152535A41574120504C1A1F000837383336323330321A20000832353531383535348407A00000000310101B0100063031313030321B12000230309C01009F21031838179A032209121A0400104D696C6C656E6E69756D2044656269741A0500142A2A2A2A202A2A2A2A202A2A2A2A2032333133205F3401011A070001311A0800063935383235341A1B0003504C4E4F07A00000000310109F02060000000000118A0230301A0600014D1A0D00052A2A2F2A2A1A1C00195445524D494E414C20544553544F57592053454C46323030301A1D0015414C2E204A45524F5A4F4C494D534B4945203130301A1E001230302D38303720574152535A41574120504C1A1F000837383336323330321A20000832353531383535348407A00000000310101B0100063031313030341B12000230309C01009F21031844419A032209121A0400104D696C6C656E6E69756D2044656269741A0500142A2A2A2A202A2A2A2A202A2A2A2A2032333133205F3401011A070001311A0800063432333335301A1B0003504C4E4F07A00000000310109F02060000000000118A0230301A0600014D1A0D00052A2A2F2A2A1A1C00195445524D494E414C20544553544F57592053454C46323030301A1D0015414C2E204A45524F5A4F4C494D534B4945203130301A1E001230302D38303720574152535A41574120504C1A1F'
    const d = merchantSlipGenerator()

    // testG(data)



  // So! Just pass the dataURI to escpos
  // escpos.Image.load('./src/services/pr.png', function (image) {
  //   device.open(function (error) {
  //     printer
  //       .align("CT")
  //       .image(image, 'D24')
  //       .then(() => { 
  //         printer
  //         .newLine()
  //         .align('lt')
  //         .text(d.merchantName)
  //         .text(d.streetAddress)
  //         .text(d.residenceInfo)
  //         .newLine()
  //         .align('rt')
  //         .text("Mid: " + d.mid)
  //         .text("Pos ID: " + d.posId)
  //         .newLine()
  //         .text("RACHUNEK NR: " + d.invoiceNumber)
  //         .text("WAŻNA DO: " + d.maskedCardExpire /*+ "/" + d.unmaskedCardExpire*/)
  //         .align('lt')
  //         .text(d.cardName)
  //         .text(d.maskedCardNumber)
  //         .newLine()
  //         .tableCustom(
  //             [
  //               { text:"SPRZEDAŻ:", align:"LEFT", width:0.20 },
  //               { text:`${d.transactionAmount} ${d.currencyCode}`, align:"RIGHT", width:0.55}
  //             ],
  //         )
  //         .align('ct')
  //         .text('KOD PIN ZGODNY' /*/ ${d.cDCVM} [for PIN / CDCVM]*/)
  //         .text('RACHUNEK DLA KLIENTA')
  //         .text("KOD AUTORYZACJI: " + d.authorizationCode)
  //         .align('lt')
  //         .text("AID: " + d.aid)
  //         .text("ATC: " + d.atc)
  //         .text("TC: " + d.tc)
  //         .newLine()
  //         .align('ct')
  //         .text('ZAPRASZAMY PONOWNIE')
  //         .text('PROSZĘ ZACHOWAĆ RACHUNEK')
  //         .newLine()
  //         .align('ct')
  //         .text("PŁAĆ ZBLIŻENIOWO WYGODNIE I BEZPIECZNIE")
  //         .tableCustom(
  //             [
  //               { text:`DATE: ${d.transactionDate}`, align:"LEFT", width:0.33 },
  //               { text:`TIME: ${d.transactionTime}`, align:"RIGHT", width:0.33 }
  //             ],
  //         )
  //         .newLine()
  //         .cut()
  //         .close()
  //       });
  //   });
  // });

    }catch(e){
        console.log(e)
    }
    
};    

module.exports = test