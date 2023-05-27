import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import directions from '../direction.json'; // направление
import districts from '../district.json'; // округ

const windowHeight = Dimensions.get('window').height;

const Filter = ({ onDirectionFilter, onDistrictFilter, selectedDirections, selectedDistricts }) => {
  const [directionsVisible, setDirectionsVisible] = useState(false);
  const [districtsVisible, setDistrictsVisible] = useState(false);

  const handleDirectionPress = (direction) => {
    const isSelected = selectedDirections && selectedDirections.includes(direction);

    if (isSelected) {
      const filteredDirections = selectedDirections.filter((item) => item !== direction);
      onDirectionFilter(filteredDirections);
    } else {
      onDirectionFilter([...selectedDirections, direction]);
    }
  };

  const handleDistrictPress = (district) => {
    const isSelected = selectedDistricts && selectedDistricts.includes(district);

    if (isSelected) {
      const filteredDistricts = selectedDistricts.filter((item) => item !== district);
      onDistrictFilter(filteredDistricts);
    } else {
      onDistrictFilter([...selectedDistricts, district]);
    }
  };

  const handleBackPress = () => {
    setDirectionsVisible(false);
    setDistrictsVisible(false);
  };

  return (
    <View style={styles.container}>
      {!directionsVisible && !districtsVisible && (
        <TouchableOpacity style={styles.button} onPress={() => setDistrictsVisible(true)}>
          <Text style={styles.buttonText}>Фильтр по округу</Text>
        </TouchableOpacity>
      )}
      {!directionsVisible && !districtsVisible && (
        <TouchableOpacity style={styles.button} onPress={() => setDirectionsVisible(true)}>
          <Text style={styles.buttonText}>Фильтр по направлению</Text>
        </TouchableOpacity>
      )}
      {directionsVisible && (
        <View style={styles.directionsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Выберите направление</Text>
          </View>
          <ScrollView contentContainerStyle={styles.directionsScrollContainer}>
            {directions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.directionButton,
                  selectedDirections && selectedDirections.includes(item.direction) && styles.selectedDirectionButton,
                ]}
                onPress={() => handleDirectionPress(item.direction)}
              >
                <Text style={styles.directionButtonText}>{item.direction}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {districtsVisible && (
        <View style={styles.directionsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Выберите округ</Text>
          </View>
          <ScrollView contentContainerStyle={styles.directionsScrollContainer}>
            {districts.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.directionButton,
                  selectedDistricts && selectedDistricts.includes(item.district) && styles.selectedDirectionButton,
                ]}
                onPress={() => handleDistrictPress(item.district)}
              >
                <Text style={styles.directionButtonText}>{item.district}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {(directionsVisible || districtsVisible) && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: windowHeight * 0.1,
    justifyContent: 'center',
    borderRadius: 8,
  },
  button: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  directionsContainer: {
    marginTop: 16,
    maxHeight: windowHeight * 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  directionsScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  directionButton: {
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  selectedDirectionButton: {
    backgroundColor: 'green',
  },
  directionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    marginTop: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default Filter;
