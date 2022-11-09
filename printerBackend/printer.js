const path = require('path')
const fs = require('fs');
const util = require('util');
const iconv = require('iconv-lite');
const QRCode = require('qrcode')

const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device  = new escpos.USB();
const options = { encoding: "852" /* default */ }
const printer = new escpos.Printer(device, options);

const test = async (qrvalue) => {
    try{
    const qr = await QRCode.toDataURL(qrvalue, {scale:14})
    escpos.Image.load(qr, function (image) {
        device.open(function (error) {
          printer
            .align("CT")
            .image(image, 'D24')
            .then(() => {
                printer.newLine().cut().close();
            })
        });
      });
    // testG(data)
    // const src = 'qrcode.png';
    // const exists = await fileExists(src);
    // let stream;
    // if(!exists) {
    //    stream = fs.createWriteStream(src);
    // }else{
    //     stream = src
    // }
    // console.log(src)
    // QRCode.toFileStream(stream, 'dasdas');


    }catch(e){
        console.log(e)
        throw e
    }
    
};    

module.exports = test