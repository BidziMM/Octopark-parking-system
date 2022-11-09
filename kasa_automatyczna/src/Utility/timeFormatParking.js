export default function(time){
    let currentDurationObject = time;
    if (currentDurationObject.h <= 9) {
        currentDurationObject.h =
          '0' + currentDurationObject.h;
      } else {
        currentDurationObject.h =
          '' + currentDurationObject.h;
      }

      if (currentDurationObject.i <= 9) {
        currentDurationObject.i =
          '0' + currentDurationObject.i;
      } else {
        currentDurationObject.i =
          '' + currentDurationObject.i;
      }
    return currentDurationObject;
}