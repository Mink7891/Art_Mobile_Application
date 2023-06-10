import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import school from '../../school.json';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList  } from 'react-native';


export default function MoscowMap() {
  const webViewRef = useRef(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [mapHTML, setMapHTML] = useState('');
  const [directions, setDirections] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [showDistricts, setShowDistricts] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showAreas, setShowAreas] = useState(false);
  const [areas, setAreas] = useState([]);

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

  


  useEffect(() => {
    extractDirections();
    extractDistricts();
    extractAreas();
  }, []);

  const extractDirections = () => {
    const allDirections = school.reduce((acc, item) => {
      const itemDirections = item.directions.map((direction) => direction.toLowerCase());
      return [...acc, ...itemDirections];
    }, []);

    const uniqueDirections = Array.from(new Set(allDirections));

    setDirections(uniqueDirections);
  };

  const extractDistricts = () => {
    const allDistricts = school.map((item) => item.district.toLowerCase());
    const uniqueDistricts = Array.from(new Set(allDistricts));

    setDistricts(uniqueDistricts);
  };

  const extractAreas = async () => {

      const uniqueAreas = new Set();
    
      for (const item of school) {
        const address = item.address;
        const coordinates = await geocodeAddress(address);
    
        if (coordinates) {
          const { latitude, longitude } = coordinates;
          const area = await getArea(latitude, longitude, '65eceb22b9fd4001b6906693fc8675d4');
    
          if (area) {
            uniqueAreas.add(area.toLowerCase());
          }
        }
      }
      setAreas(Array.from(uniqueAreas));
  };

  useEffect(() => {
    addMarkersToMap();
  }, [selectedDirections, selectedDistricts, selectedAreas]);

  const addMarkersToMap = async () => {
    try {
      const apiKey = '3def7766-dde6-4c97-a197-5c3ac2a26e4b'; // Replace with your Yandex Geocoding API key
      const markers = await Promise.all(
        school.map(async (item) => {
          const address = item.address;
          const response = await axios.get(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(
              address
            )}`
          ); 
          const coordinates =
            response.data.response.GeoObjectCollection.featureMember[0].GeoObject
              .Point.pos;
          const [longitude, latitude] = coordinates.split(' ');
          return {
            latitude: latitude,
            longitude: longitude,
            data: item,
          };
          
        })
      );

      const filteredMarkers = await Promise.all(
        markers.map(async (marker) => {
          const area = await getArea(marker.latitude, marker.longitude, '65eceb22b9fd4001b6906693fc8675d4');
  
          if (area) {
            marker.data.area = area.toLowerCase();
          }
      
      
          const directionsMatch =
            selectedDirections.length === 0 ||
            marker.data.directions.some((direction) =>
              selectedDirections.includes(direction.toLowerCase())
            );
      
          const districtsMatch =
            selectedDistricts.length === 0 ||
            selectedDistricts.includes(marker.data.district.toLowerCase());
      
          const areasMatch =
            selectedAreas.length === 0 ||
            (marker.data.area && selectedAreas.includes(marker.data.area.toLowerCase()));
      
          return directionsMatch && districtsMatch && areasMatch;
        })
      );
      

      const filteredMarkersData = markers.filter((marker, index) => filteredMarkers[index]);

      const markerScript = filteredMarkersData.map((marker, index) => `
      var marker${index} = L.marker([${marker.latitude}, ${marker.longitude}]).addTo(map);
      var popupContent${index} = '<h3>${marker.data.name}</h3>' +
                         '<p>Адрес: ${marker.data.address}</p>' +
                         '<p>Телефон: ${marker.data.phone_number}</p>' +
                         '<p>Email: ${marker.data.mail}</p>' +
                         '<p>${marker.data.description}</p>' +
                         '<p>Направления: ${marker.data.directions.join(', ')}</p>';
      var popup${index} = L.popup().setContent(popupContent${index});
      marker${index}.bindPopup(popup${index});
      marker${index}.on('click', function() {
        marker${index}.openPopup();
      });
    `).join('\n');
    
  
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Map</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            #map {
              height: 100vh;
              width: 100vw;
            }
          </style>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        </head>
        <body>
          <div id="map"></div>
          <script>
            var map = L.map('map').setView([55.751244, 37.618423], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              attributionControl: false // Remove attribution
            }).addTo(map);

            var southWest = L.latLng(55.229926, 36.759328); // Southwest boundary of Moscow extended by 30km
            var northEast = L.latLng(56.389657, 38.477190); // Northeast boundary of Moscow extended by 30km
            var bounds = L.latLngBounds(southWest, northEast);
            map.setMaxBounds(bounds);
            map.on('drag', function() {
              map.panInsideBounds(bounds, { animate: false });
            });
            map.setMinZoom(9); // Set minimum zoom level

            // Disable zoom buttons
            map.zoomControl.remove();

            // Disable zooming with hotkeys
            map.keyboard.disable();

            ${markerScript}
          </script>
        </body>
        </html>
      `;

      setMapHTML(html);
    } catch (error) {
      console.error('Error adding markers to map:', error);
    }
  };

  const handleFilterPress = () => {
    setFilterVisible(true);
  };

  const handleDistrictFilter = () => {
    // Handle district filter logic here
    setShowDistricts(true);
    setFilterVisible(true);
  };

  const handleAreaFilter = () => {
    setShowAreas(true); // Установите флаг showAreas в true
    setFilterVisible(true); // Показать текущий оверлей фильтра
  };

  const handleDirectionFilter = () => {
    setShowDirections(true); 
    setFilterVisible(true);  // Hide the current filter overlay
  };

  const handleDirectionSelection = (selectedDirection) => {
    if (selectedDirections.includes(selectedDirection)) {
      // Если направление уже выбрано, удаляем его из массива выбранных направлений
      setSelectedDirections((prevSelectedDirections) =>
        prevSelectedDirections.filter((direction) => direction !== selectedDirection)
      );
    } else {
      // Если направление не выбрано, добавляем его в массив выбранных направлений
      setSelectedDirections((prevSelectedDirections) => [...prevSelectedDirections, selectedDirection]);
    }
    addMarkersToMap();
  };

  const handleDistrictSelection = (selectedDistrict) => {
    if (selectedDistricts.includes(selectedDistrict)) {
      // If the district is already selected, remove it from the selectedDistricts array
      setSelectedDistricts((prevSelectedDistricts) =>
        prevSelectedDistricts.filter((district) => district !== selectedDistrict)
      );
    } else {
      // If the district is not selected, add it to the selectedDistricts array
      setSelectedDistricts((prevSelectedDistricts) => [...prevSelectedDistricts, selectedDistrict]);
    }
    addMarkersToMap();
  };

  const handleAreaSelection = (selectedArea) => {
    if (selectedAreas.includes(selectedArea)) {
      setSelectedAreas((prevSelectedAreas) =>
        prevSelectedAreas.filter((area) => area !== selectedArea)
      );
    } else {
      setSelectedAreas((prevSelectedAreas) => [...prevSelectedAreas, selectedArea]);
    }
    addMarkersToMap();
  };

  const handleCloseFilter = () => {
    setFilterVisible(false);
    setShowDistricts(false);
    setShowDirections(false);
    setShowAreas(false);
    addMarkersToMap();
  };


  const renderFilterOverlay = () => {
    if (filterVisible) {
      if (showDirections) {
        return (
          <View style={filterButtonStyles.filterOverlay}>
            <FlatList
              data={directions}
              style={{ width: 250, maxHeight: 480 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleDirectionSelection(item)}
                  style={[
                    filterButtonStyles.filterButton,
                    selectedDirections.includes(item) ? filterButtonStyles.selectedFilterButton : null,
                  ]}
                >
                  <Text style={filterButtonStyles.filterButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={handleCloseFilter} style={filterButtonStyles.closeButton}>
              <Text style={filterButtonStyles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        );
      }else if (showDistricts) {
        return (
          <View style={filterButtonStyles.filterOverlay}>
            <FlatList
              data={districts}
              style={{ width: 250, maxHeight: 480 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleDistrictSelection(item)}
                  style={[
                    filterButtonStyles.filterButton,
                    selectedDistricts.includes(item) ? filterButtonStyles.selectedFilterButton : null,
                  ]}
                >
                  <Text style={filterButtonStyles.filterButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={handleCloseFilter} style={filterButtonStyles.closeButton}>
              <Text style={filterButtonStyles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (showAreas) {
        return (
          <View style={filterButtonStyles.filterOverlay}>
            <FlatList
              data={areas} // Используйте список округов для отображения данных
              style={{ width: 250, maxHeight: 480 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAreaSelection(item)} // Передайте выбранный округ в функцию handleAreaFilter
                  style={[
                    filterButtonStyles.filterButton,
                    selectedAreas.includes(item) ? filterButtonStyles.selectedFilterButton : null, // Примените стиль для выбранных округов
                  ]}
                >
                  <Text style={filterButtonStyles.filterButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={filterButtonStyles.closeButton}
              onPress={handleCloseFilter}
            >
              <Text style={filterButtonStyles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={filterButtonStyles.filterOverlay}>
            <View style={filterButtonStyles.filterButtonsContainer}>
              <TouchableOpacity
                onPress={handleAreaFilter}
                style={filterButtonStyles.filterButton}
              >
                <Text style={filterButtonStyles.filterButtonText}>
                  По району
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDistrictFilter}
                style={filterButtonStyles.filterButton}
              >
                <Text style={filterButtonStyles.filterButtonText}>
                  По округу
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDirectionFilter}
                style={filterButtonStyles.filterButton}
              >
                <Text style={filterButtonStyles.filterButtonText}>
                  По направлению
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleCloseFilter}
              style={filterButtonStyles.closeButton}
            >
              <Text style={filterButtonStyles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return null;
    }
  };


  const filterButtonStyles = StyleSheet.create({
    scrollContainer: {
      maxHeight: 500, // Установите желаемую высоту списка
    },
    filterButtonContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
    filterButton: {
      width: 300,
      flex: 1,
      backgroundColor: '#000',
      opacity: 0.7,
      padding: 10,
      alignItems: 'center',
    },
    selectedFilterButton: {
      backgroundColor: 'green', // Изменяем стиль для выбранной кнопки
    },
    filterButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    filterOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      display: filterVisible ? 'flex' : 'none',
    },
    filterButtonsContainer: {
      backgroundColor: '#fff',
      padding: 10, // Уменьшите внутренний отступ
      borderRadius: 5,
    },
    filterButton: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#eee',
    },
    filterButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#eee',
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <WebView ref={webViewRef} source={{ html: mapHTML }} />
      {!filterVisible && (
        <View style={filterButtonStyles.filterButtonContainer}>
          <TouchableOpacity
            onPress={handleFilterPress}
            style={filterButtonStyles.filterButton}
          >
            <Text style={filterButtonStyles.filterButtonText}>Фильтр</Text>
          </TouchableOpacity>
        </View>
      )}
      {renderFilterOverlay()}
    </View>
  );
}
