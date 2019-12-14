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

export function getDay(date) {
  return moment(date).day();
}

export function isInvalidDate(date, moveDirection) {
  if (getDay(date) === 1 && moveDirection === 'decrement') {
    return true;
  }
  if (getDay(date) === 5 && moveDirection === 'increment') {
    return true;
  }
  return false;
}

export function changeByOneDay(date, direction) {
  if (direction === 'increment') {
    return moment(date).add(1, 'd');
  } else if (direction === 'decrement') {
    return moment(date).subtract(1, 'd');
  } else {
    return date;
  }
}
