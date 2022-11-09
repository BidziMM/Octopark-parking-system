const terminalTags = require('./terminalTags')

const hexToDecimal = hex => parseInt(hex, 16);

const hexToAscii = (s) => {
	var hex  = s.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }


//Tłumaczenie TLV - TAG LENGTH VALUE
const translate = (s) => {
    const translatedObject = {}
    //Index oznacza początek tagu
    let index = 0;
    //Długość ciągu znaków czyli 9F21 03 114032 to druga wartośc "03" oznacza długość w hex musimy ją zamienić na decimal + długości liczymy co 2 znaki 
    //Przykład 114032 i długośc jest 03 to dzielimy stringa na 11 40 32 dla tagu 9F21 jest to godzina tranzakcji 11:40:32
    let lenghtOfValue;
    while(index < s.length){
        //Wybieramy tag ze słownika, tagi mogą być 2 lub 4 znakowe czyli sprawdzamy czy istneje dany tag o 2 znakach jezeli nie to szukamy o 4 znakach, słownik zawiera wszystkie tagi więc nie ma sytuacji ze dany tag nie istnieje
        let tag = terminalTags[s.slice(index, index+2)] ? s.slice(index, index+2) : s.slice(index, index+4)
        //Jest to wartość od które zaczyna się value, jest to tez uzywane do obliczania l-długości value
        let valueStarts = index + tag.length
        //Sprawdzamy typ tagu (P)polcard ma swoje własne kodowanie a (E) jest standardem płatniczym róznia sie tym ze standard płatnicz zawsze ma długośc składającą się z 2 znaków a polcard uzywa 4 znaków
        if(terminalTags[tag].type === "E"){
            //Ucinamy długość ze stringa
            const l = s.slice(valueStarts, valueStarts+2)
            //Dodajemy +2 bo string zawierający długość posiada 2 znaki czyli teraz zaczynamy od value
            valueStarts = valueStarts + 2
            //Zamina hex na decimal
            lenghtOfValue = hexToDecimal(l)
        }else{
            const l = s.slice(valueStarts, valueStarts+4)
            valueStarts = valueStarts + 4
            lenghtOfValue = hexToDecimal(l)
        }
        //Przejście do kolejnego tagu
        index = 2 * lenghtOfValue + valueStarts
        //Otrzymujemy wartosc
        const tagValue = s.slice(valueStarts, 2 * lenghtOfValue + valueStarts)
        translatedObject[tag] = terminalTags[tag].type === "P" || terminalTags[tag].exception === true ? hexToAscii(tagValue) : tagValue
    }
    console.log(translatedObject)
    return translatedObject
}

const tag = "9F21031140329A032209081A0400075265766F6C75741A0500142A2A2A2A202A2A2A2A202A2A2A2A2037373833205F3401001A070001311A1B0003504C4E4F07A00000000310109F260862A6F12C3897FE619F12075265766F6C7574500A566973612044656269749F02060000000000108A0230351A0600014D1A0D00052A2A2F2A2A9F360200051A1700AC50A341C6205A424C49AF454E494F574F202D205759474F444E494520492042455A504945435A4E49452120496E666F726D61636A6520646F7479637AB963652070727A65747761727A616E69612064616E796368206F736F626F7779636820706F7369616461637A79206B6172742070727A657A2046697365727620506F6C736B6120532E412E207A6E616A64756AB9207369EA206E613A207777772E706F6C636172642E706C2F524F444F1A1C00195445524D494E414C20544553544F57592053454C46323030301A1D0015414C2E204A45524F5A4F4C494D534B4945203130301A1E001230302D38303720574152535A41574120504C1A1F000837383336323330321A20000832353531383535348407A00000000310101B0100063030393030321B0200093035313130303030301B0300064F444D4F57411B080007303030303031309F2701801B12000230309C0100"
translate(tag)

module.exports = translate
