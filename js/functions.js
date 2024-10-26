let translationInMinutes = (time) => {
  time = time.split(':').map(string => +string);
  return time[0] * 60 + time[1];
};

let timeManagement = (startOfWorking, endOfWorking, startOfMeeting, timeOfMeeting) => {
  let startW = translationInMinutes(startOfWorking);
  let endW = translationInMinutes(endOfWorking);
  let startM = translationInMinutes(startOfMeeting);

  if (startW <= startM && startM + timeOfMeeting <= endW) return true;
  return false
};

