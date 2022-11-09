const emv = require('node-emv');

function toHex(data) {
    var result = '';
    for (var i=0; i<data.length; i++) {
      result += data.charCodeAt(i).toString(16);
    }
    return result;
  }
function hex_to_ascii(hex)
  {
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
    
	return str//.replace(/[^\x00-\xFF]/g, "");
  }

const zeroPad = (num, places) => String(num).padStart(places, '0')

//const companyName = toHex("OctoPark")
const manufactureOfEcrSystem = toHex("Octopark")
const versionEcr = toHex("1.12")
const lastUpadetEcrSystemUpdate = toHex("2022/09/12 12:42:00")
//const companyName = "1C10001F54726F6666656520427573696E65737320536F6C7574696F6E7320422E562E1C1100033130321C120013323031392F30392F31392031323A34333A30301C19000730303436303130"
const helloExtendCommend = `1C10${manufactureOfEcrSystem}1C11${versionEcr}1C12${lastUpadetEcrSystemUpdate}1C19000730303436303130`
const helloCommendLength = zeroPad(helloExtendCommend.length, 4)
const ecrCommends = {
    payment:(value) => `|2811011|00|${value}||||||PLN||||`,
    //hello:`|2841111|0|||||1|${helloCommendLength}|${helloExtendCommend}|`,
    hello: `|2841111|0|||||0|0152|1C10001F54726F6666656520427573696E65737320536F6C7574696F6E7320422E562E1C1100033130321C120013323031392F30392F31392031323A34333A30301C19000730303436303130|`,
    posError:"2830010", //Message which informs about error on PINPAD/POS side - <pos_error>
    raport:"|2881111|", //Close day
    abortTransaction:"|2821000|99|||",
    blikReturnOption:{  //|2820010|028|Czy uzyc platnosci mobilnej?|0|1|030|
        yes:"|2821000|01|001|0|",
        no:"|2821000|01|001|1|"
    },
}

//
const comm = {
    //*Administrative messages*//
    //Send message to display on ECR
    ["2820010"]:{
        ["ODMOWA"]:"paymentDenied",
        ["ZGODA"]:"paymentAccepted",
        ["Laczenie z PolCard. Prosze czekac..."]:"processingPayment"
    },
    //*Authorization response*//
    ["2810000"]:{
        ["8"]:"timeout",
    }
}
const terminalResponse = (data) => {
    data = data.split(",")
    const posCode = data[0]
    const poslength = data[1]
    const posEvent = data[2]
    console.log(comm?.[posCode]?.[posEvent])
    return comm?.[posCode]?.[posEvent]
}

/*const taglist = {
    "1A1C",
    "1A1D",
    "1A1E",
    "1A1F",
    "1A20",
    "1A04",
    "1A05",
    "1B01",
    "1A0D",
    "1A0F",
    "9F02",
    "1A1B",
    "1C05",
    "1A08",
    "4F",
    "9F36",
    "9F26",
    "1C25",
    "1C26",
    "9A",
    "9F21"
}*/

const testG = (s) => {
    emv.parse(s, function(data){
        if(data != null){
            console.log(data);
        }
    });
}

const generateFromTags = (s) => {

}

const getLenght = (s) => {
    
}


const decodeTags = (s) => {
    const tlvString = s;
    return{
        //9F21
        transactionTime: tlvString.find(item => item.tag === "9F21").value,//getValueFromTags("9F21","9A").replace('03', '').slice(4),
    }
}

/*const merchantSlipGenerator = (data) => {
    let tagData;
    const getValueFromTags = (tag1, tag2) => {
        const indexStart = data.indexOf(tag1)
        const indexEnd = data.indexOf(tag2)
        const word = data.substring(indexStart, indexEnd)
        data = data.slice(indexEnd)
        //console.log(data+'\n'+'\n')
        return word
    }

    emv.describe(data, function(data){
        if(data != null){
            console.log(data)
            tagData = data
        }
    });

    //console.log(data)
    return{
    testowy: hex_to_ascii("1A1C00195445524D494E414C20544553544F57592053454C46323030301A1D"),
    
    //9F21
    transactionTime: tagData.find(item => item.tag === "9F21").value,//getValueFromTags("9F21","9A").replace('03', '').slice(4),
    //9A
    transactionDate: tagData.find(item => item.tag === "9A").value,// getValueFromTags("9A","1A04").replace('03', '').slice(2),
    //1A04
    cardName: hex_to_ascii(tagData.find(item => item.tag === "1A").value),//hex_to_ascii(getValueFromTags("1A04","1A05")),
    //1A05
    maskedCardNumber: hex_to_ascii(getValueFromTags("1A05","5F34")),
    //1A08
    //authorizationCode: hex_to_ascii(getValueFromTags("1A08","1B19")),
    //1A1B
    //currencyCode: hex_to_ascii(getValueFromTags("1A1B","1A0A")),
    //4F
    aid: hex_to_ascii(getValueFromTags("4F","9F02")),
    //9F26
    tc: hex_to_ascii(getValueFromTags("9F26","9F12")),
    //9F02
    transactionAmount: hex_to_ascii(getValueFromTags("9F02","8A")),
    //1A06
    cardReadMethod: hex_to_ascii(getValueFromTags("1A06","1A0D")),
    //1A0D
    maskedCardExpire: hex_to_ascii(getValueFromTags("1A0D","1A0E")),
    //1A0F
    unmaskedCardExpire: hex_to_ascii(getValueFromTags("1A0F","1A10")),
    //9F36
    atc: hex_to_ascii(getValueFromTags("9F36","1A15")),
    //1A1C
    merchantName: hex_to_ascii(getValueFromTags("1A1C", "1A1D")),
    //1A1D
    streetAddress: hex_to_ascii(getValueFromTags("1A1D","1A1E")),
    //1A1E
    residenceInfo: hex_to_ascii(getValueFromTags("1A1E","1A1F")),
    //1A1F
    mid: hex_to_ascii(getValueFromTags("1A1F","1A20")),
    //1A20
    posId: hex_to_ascii(getValueFromTags("1A20","84")),
    //1B01
    invoiceNumber: hex_to_ascii(getValueFromTags("1B01","1B02")),
    //1B01
    receiptIdentifer: hex_to_ascii(getValueFromTags("1B01","1B08")),
    //(Consumer Device Cardholder Verification Method)
    //1C05
    cDCVM: hex_to_ascii(getValueFromTags("1C05","1C06")),

    }
}
*/


const merchantSlipGenerator = () => {
    return{
    //9F21
    transactionTime: "18:12:07",
    //9A
    transactionDate: "22/09/12",
    //1A04
    cardName: "Millennium Debit",
    //1A05
    maskedCardNumber: "**** **** **** 2313",
    //1A08
    authorizationCode: "614206",
    //1A1B
    currencyCode: "PLN",
    //4F
    aid: "A0000000031010",
    //9F26
    tc: "77BE892C7A2AD433",
    //9F02
    //! Pamietaj aby zmienic
    transactionAmount: Intl.NumberFormat('en-US').format("000000000100")/100,
    //1A06
    cardReadMethod: "M",
    //1A0D
    maskedCardExpire: "**/**",
    //1A0F
    //unmaskedCardExpire: 
    //9F36
    atc: "PŁAĆ ZBLIŻENIOWO - WYGODNIE I BEZPIECZNIE! Informacje dotyczące przetwarzania danych osobowych posiadaczy kart przez Fiserv Polska S.A. znajdują się na: www.polcard.pl/RODO",
    //1A1C
    merchantName: "TERMINAL TESTOWY SELF2000",
    //1A1D
    streetAddress: "AL. JEROZOLIMSKIE 100",
    //1A1E
    residenceInfo: "00-807 WARSZAWA PL",
    //1A1F
    mid: "78362302",
    //1A20
    posId: "25518554",
    //1B01
    invoiceNumber: "011002",

    //(Consumer Device Cardholder Verification Method)
    //1C05
    //cDCVM: 
    
    }
}

module.exports = {ecrCommends,terminalResponse, merchantSlipGenerator, testG}