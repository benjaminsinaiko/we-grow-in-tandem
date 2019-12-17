import moment from 'moment';
import uuidv4 from 'uuid/v4';

import { getPast } from './dateHelpers';

// Get watering schedule for a specific plant
export function getPlantSchedule(startDate, endDate, plant) {
  const daysBetweenWatering = parseInt(plant.water_after);
  let waterDay = startDate;
  let plantDays = [];

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
      name: plant.name,
      water_after: plant.water_after,
      start: waterDay,
      end: waterDay.add(1, 'm'),
      allDay: true
    });
    waterDay = moment(waterDay).add(daysBetweenWatering, 'd');
  }
  return plantDays;
}

// Get watering schedule for all plants in array
export function getScheduleDates(startDate, endDate, plantArray) {
  const plantSchedule = plantArray.reduce((waterDays, plant) => {
    const plantDays = getPlantSchedule(startDate, endDate, plant);
    return [...waterDays, ...plantDays];
  }, []);

  return plantSchedule;
}

// Generate new schedule for plant, based on updated watering date
export function getNewSchedule(selectedPlant, schedule, newDate) {
  const pastDays = getPast(selectedPlant, schedule.plantSchedule);
  const newDates = getPlantSchedule(newDate, schedule.endDate, selectedPlant);
  const otherPlants = schedule.plantSchedule.filter(plant => plant.name !== selectedPlant.name);

  return [...pastDays, ...newDates, ...otherPlants];
}
