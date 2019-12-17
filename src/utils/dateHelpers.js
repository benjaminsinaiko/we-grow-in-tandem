import moment from 'moment';

// Calculate schedule end date from watering duraion
export function getEndDate(startDate, duration) {
  return moment(startDate).add(duration, 'w');
}

// Check if one date comes after another
export function isInFuture(fromDate, toDate) {
  return moment(toDate).isAfter(fromDate);
}

// Find day of week from date
export function getDay(date) {
  return moment(date).day();
}

// Check if day is invalid, a Saturday or Sunday
export function isInvalidDate(date, moveDirection) {
  if (getDay(date) === 1 && moveDirection === 'decrement') {
    return true;
  }
  if (getDay(date) === 5 && moveDirection === 'increment') {
    return true;
  }
  return false;
}

// Change plant watering day by 1 day
export function changeByOneDay(date, direction) {
  if (direction === 'increment') {
    return moment(date).add(1, 'd');
  } else if (direction === 'decrement') {
    return moment(date).subtract(1, 'd');
  } else {
    return date;
  }
}

// Find upcoming watering dates for specific plant
export function getUpcoming(selectedPlant, plantSchedule) {
  return plantSchedule.filter(plant => {
    return plant.name === selectedPlant.name && isInFuture(selectedPlant.start, plant.start);
  });
}

// Find past watering dates for specific plant
export function getPast(selectedPlant, plantSchedule) {
  return plantSchedule.filter(plant => {
    return (
      plant.name === selectedPlant.name &&
      !isInFuture(selectedPlant.start, plant.start) &&
      plant.id !== selectedPlant.id
    );
  });
}

// Format for displaying date range
export function displayRangeFormat(date) {
  return moment(date).format('MMM Do');
}

// Format for displaying single date
export function displayInfoDate(date) {
  return moment(date).format('ddd, MMM Do YYYY');
}
