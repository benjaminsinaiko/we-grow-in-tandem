import moment from 'moment';

export function getEndDate(startDate, duration) {
  return moment(startDate).add(duration, 'w');
}

export function displayRangeFormat(date) {
  return moment(date).format('MMM Do');
}

export function displayInfoDate(date) {
  return moment(date).format('ddd, MMM Do YYYY');
}
