import moment from 'moment';

function isInFuture(fromDate, toDate) {
  return moment(toDate).isAfter(fromDate);
}

export default function getUpcoming(selectedPlant, plantSchedule) {
  const upcomingList = plantSchedule.filter(plant => {
    return plant.title === selectedPlant.title && isInFuture(selectedPlant.start, plant.start);
  });

  return upcomingList;
}
