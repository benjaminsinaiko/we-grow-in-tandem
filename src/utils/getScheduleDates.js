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

export default function getScheduleDates(startDate, endDate, duration, durationUnit) {
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
        title: plant.name,
        waterInfo: plant.water_after,
        start: waterDay.format(),
        end: waterDay.add(1, 'm').format(),
        allDay: true,
        [`${plantName}`]: waterDay
      });
      waterDay = moment(waterDay).add(daysBetweenWatering, 'd');
    }

    return [...waterDays, ...plantDays];
  }, []);

  return plantSchedule;
}
