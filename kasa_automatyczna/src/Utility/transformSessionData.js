import timeFormatParking from "./timeFormatParking";

export default ({data}) => {
    const formatedTime = timeFormatParking(
        data.overridingSessionObject.currentDurationObject
      );
      data = {
        ...data,
        overridingSessionObject: {
          ...data.overridingSessionObject,
          anonymousUser: data.overridingSessionObject.userId === -1 ? true : false,
          currentDurationObject: formatedTime,
          qrValue: data.overridingSessionObject.uniqueQrCodeValue
        },
      };
    return data
}