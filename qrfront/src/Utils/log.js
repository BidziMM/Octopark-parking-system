import Config from '../Config'

const logData = (qrValue) => ({
    qrValue: qrValue,
    date: new Date(),
    parkingId:Config.parkingId,
    tagId:Config.tagId
   });
export default logData