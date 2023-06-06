import axios from 'axios';
import school from '../../school.json'

async function getArea(latitude, longitude, api_key) {
  const url = 'https://api.opencagedata.com/geocode/v1/json';
  const params = {
    q: `${latitude},${longitude}`,
    key: api_key,
    countrycode: 'ru'
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.status.code === 200 && data.results.length > 0) {
      const result = data.results[0];
      const components = result.components;
      const area = components.suburb || components.neighbourhood;
        
      if (area) {
        return area;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении района:', error);
    return null;
  }
}

const api_key = '3baa315089ed48d5b46b0f7e18c09074';

const markers = [];

const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${encodeURIComponent(
          address
        )}&apikey=3def7766-dde6-4c97-a197-5c3ac2a26e4b`
      );
      const data =  await response.data;
      const foundLocations = data.response.GeoObjectCollection.featureMember;
  
      if (foundLocations.length > 0) {
        const location = foundLocations[0].GeoObject.Point.pos.split(' ');
        const latitude = parseFloat(location[1]);
        const longitude = parseFloat(location[0]);
        return { latitude, longitude };
      }
    } catch (error) {
      console.error('Ошибка при геокодировании адреса:', error);
    }
  
    return null;
  };


  const processAddresses = async () => {
    try {
      const areas = [];
  
      for (const addressData of school) {
        const address = addressData.address;
        const geocodeResult = await geocodeAddress(address);
  
        if (geocodeResult) {
          const latitude = geocodeResult.latitude;
          const longitude = geocodeResult.longitude;
          const area = await getArea(latitude, longitude, api_key);
  
          if (area) {
            const marker = {
              address,
              latitude,
              longitude,
              area
            };
            markers.push(marker);
            areas.push(area);
          }
        }
      }
  
      // Form unique areas list
      const uniqueAreas = [...new Set(areas)];
      return uniqueAreas;
    } catch (error) {
      console.error('Error processing addresses:', error);
    }
  };
  
  export { processAddresses, geocodeAddress, getArea };
