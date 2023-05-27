import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import school from '../school.json';
import InfoWindow from './InfoWindow';
import Filter from './Filter';
import * as Location from 'expo-location';


const MoscowMap = () => {
  const mapRef = useRef(null);
  const [previousRegion, setPreviousRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterButtonVisible, setFilterButtonVisible] = useState(true);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isNearbyPressed, setIsNearbyPressed] = useState(false);
  const [originalMarkers, setOriginalMarkers] = useState([]);


  const handleRegionChangeComplete = (region) => {
    const moscowRegion = {
      latitude: 55.751244,
      longitude: 37.618423,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    };

    const isInMoscowBounds =
      region.latitude >= moscowRegion.latitude - moscowRegion.latitudeDelta / 0.9 &&
      region.latitude <= moscowRegion.latitude + moscowRegion.latitudeDelta / 0.9 &&
      region.longitude >= moscowRegion.longitude - moscowRegion.longitudeDelta / 0.9 &&
      region.longitude <= moscowRegion.longitude + moscowRegion.longitudeDelta / 0.9;

    if (!isInMoscowBounds && previousRegion) {
      mapRef.current.animateToRegion(previousRegion, 500);
    } else {
      setPreviousRegion(region);
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    const { latitude, longitude } = marker;
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    mapRef.current.animateToRegion(newRegion, 500);
    setFilterButtonVisible(false);
  };

  const handleCloseInfoWindow = () => {
    setSelectedMarker(null);
    setFilterButtonVisible(true);
  };

  const handleDistrictFilter = (filterType) => {
    setSelectedDistricts(filterType);
  };

  const handleDirectionFilter = (filterType) => {
    setSelectedDirections(filterType);
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${encodeURIComponent(
          address
        )}&apikey=b35f62ea-46d0-4e7d-b7aa-589390226795`
      );
      const data = await response.json();
      const foundLocations = data.response.GeoObjectCollection.featureMember;

      if (foundLocations.length > 0) {
        const location = foundLocations[0].GeoObject.Point.pos.split(' ');
        const latitude = parseFloat(location[1]);
        const longitude = parseFloat(location[0]);
        return { latitude, longitude };
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }

    return null;
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const updatedMarkers = [];
      for (const marker of school) {
        const { address } = marker;
        const coordinates = await geocodeAddress(address);
        if (coordinates) {
          updatedMarkers.push({ ...marker, latitude: coordinates.latitude, longitude: coordinates.longitude });
        }
      }
      setMarkers(updatedMarkers);
    };

    fetchMarkers();

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Error getting location');
      }
    })();
  }, []);

  const handleFilterButtonPress = () => {
    setFilterButtonVisible(false);
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterButtonVisible(true);
    setFilterModalVisible(false);
  };

  const filteredMarkers =
    selectedDirections.length > 0 || selectedDistricts.length > 0
      ? markers.filter((marker) => {
          const hasSelectedDirections =
            selectedDirections.length === 0 ||
            (marker.directions &&
              selectedDirections.every((selectedDir) =>
                marker.directions.some(
                  (markerDir) =>
                    markerDir &&
                    markerDir.toLowerCase() === selectedDir.toLowerCase()
                )
              ));
          const hasSelectedDistricts =
            selectedDistricts.length === 0 ||
            selectedDistricts.some(
              (selectedDistrict) =>
                marker.district &&
                marker.district.toLowerCase() === selectedDistrict.toLowerCase()
            );
          return hasSelectedDirections && hasSelectedDistricts;
        })
      : markers;

      const isLocationInMoscow = (latitude, longitude) => {
        const moscowBounds = {
          north: 56.009657,
          south: 55.489926,
          west: 36.826168,
          east: 37.967154,
        };
      
        return (
          latitude >= moscowBounds.south &&
          latitude <= moscowBounds.north &&
          longitude >= moscowBounds.west &&
          longitude <= moscowBounds.east
        );
      };
      
      const handleNearbyButtonPress = () => {
        if (location) {
          if (isNearbyPressed) {
            // Восстанавливаем исходный список меток
            setMarkers(originalMarkers);
            setIsNearbyPressed(false);
          } else {
            const nearbyMarkers = markers.map((marker) => {
              const distance = getDistanceFromLatLonInKm(
                location.coords.latitude,
                location.coords.longitude,
                marker.latitude,
                marker.longitude
              );
              return { ...marker, distance };
            });
    
            nearbyMarkers.sort((a, b) => a.distance - b.distance);
    
            if (isLocationInMoscow(location.coords.latitude, location.coords.longitude)) {
              // Если пользователь находится в Москве, отображаем метки в радиусе 5 км
              const markersWithinRadius = nearbyMarkers.filter((marker) => marker.distance <= 5);
              setMarkers(markersWithinRadius);
            } else {
              // Если пользователь не находится в Москве, отображаем только ближайшую метку
              const closestMarker = nearbyMarkers[0];
              setMarkers([closestMarker]);
            }
    
            // Сохраняем исходный список меток перед фильтрацией
            setOriginalMarkers(markers);
            setIsNearbyPressed(true);
          }
        }
      };

    
      const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Радиус Земли в километрах
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
      };
    
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
      

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 55.751244,
          longitude: 37.618423,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        maxZoomLevel={16}
        minZoomLevel={10}
      >
        {location && (
          <Circle
                center={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                radius={200}
                fillColor="rgba(255, 0, 255, 0.7)"
                strokeColor="rgba(255, 0, 0, 0.5)"
                strokeWidth={1}
          />
        )}
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.address}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <InfoWindow marker={selectedMarker} onClose={handleCloseInfoWindow} />
      )}

      {filterButtonVisible && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterButtonPress}
        >
          <Text style={styles.filterButtonText}>Фильтр</Text>
        </TouchableOpacity>
      )}

      {filterButtonVisible && (
        <TouchableOpacity
          style={styles.nearbyButton}
          onPress={handleNearbyButtonPress}
        >
          <Text style={styles.nearbyButtonText}>Рядом</Text>
        </TouchableOpacity>
      )}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.filterModal}>
          <Filter
            onDistrictFilter={handleDistrictFilter}
            onDirectionFilter={handleDirectionFilter}
            selectedDirections={selectedDirections}
            selectedDistricts={selectedDistricts}
          />
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={handleCloseFilterModal}
          >
            <Text style={styles.closeModalButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    left: 10,
    bottom: 43,
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  nearbyButton: {
    position: 'absolute',
    right: 10,
    bottom: 43,
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  nearbyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeModalButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  closeModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MoscowMap;
