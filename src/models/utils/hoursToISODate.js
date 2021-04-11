/* eslint-disable no-unused-vars */
const moment = require('moment');

const hoursToISODate = (userInputHours) => {
  const hours = userInputHours.slice(0, 2);
  const minutes = userInputHours.slice(3);
  const date = new Date();
  date.setHours(hours, minutes);
  return moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ');
};

module.exports = hoursToISODate;
