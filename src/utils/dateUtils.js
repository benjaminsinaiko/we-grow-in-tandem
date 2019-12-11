import moment from 'moment';

// Sample plant info
const plantInfo = [
  {
    name: 'Fiddle Leaf Fig',
    water_after: '7 days'
  },
  {
    name: "Bird's Nest Fern",
    water_after: '3 days'
  }
];

export function getScheduleDates(startDate, duration, durationUnit) {
  const endDate = moment(startDate).add(duration, durationUnit);

  const plantSchedule = plantInfo.reduce((waterDays, plant) => {
    const plantName = plant.name;
    const daysBetweenWatering = parseInt(plant.water_after);
    let waterDay = startDate;
    let plantDays = [];

    // Calc water days during watering duration, without weekends
    while (waterDay < endDate) {
      if (waterDay.day() === 6) {
        waterDay = moment(waterDay).subtract(1, 'd');
      }
      if (waterDay.day() === 0) {
        waterDay = moment(waterDay).add(1, 'd');
      }
      plantDays.push({
        [`${plantName}`]: waterDay.format()
      });
      waterDay = moment(waterDay).add(daysBetweenWatering, 'd');
    }

    return [...waterDays, ...plantDays];
  }, []);

  return plantSchedule;
}
