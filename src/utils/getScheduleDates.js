import moment from 'moment';
import uuidv4 from 'uuid/v4';

// import plant data, could also come from api/db
import waterData from '../api/waterData.json';

export default function getScheduleDates(startDate, endDate) {
  const plantSchedule = waterData.reduce((waterDays, plant) => {
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
        id: uuidv4(),
        title: plant.name,
        waterInfo: plant.water_after,
        start: waterDay.format(),
        end: waterDay.add(1, 'm').format(),
        allDay: true
      });
      waterDay = moment(waterDay).add(daysBetweenWatering, 'd');
    }

    return [...waterDays, ...plantDays];
  }, []);

  return plantSchedule;
}
