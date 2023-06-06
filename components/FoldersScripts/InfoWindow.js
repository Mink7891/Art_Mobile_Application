import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const InfoWindow = ({ marker, onClose }) => {
  const { name, address, phone_number, mail, description, features, directions } = marker;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Закрыть</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Адрес:</Text>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.label}>Телефон:</Text>
          <Text style={styles.text}>{phone_number}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{mail}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Описание:</Text>
          <Text style={styles.text}>{description}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Особенности:</Text>
          <Text style={styles.text}>{features}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Направления:</Text>
          {directions.map((direction, index) => (
            <Text key={index} style={styles.text}>
              {direction}
            </Text>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 8,
    marginTop: 4,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
  },
  scrollContainer: {
    maxHeight: 300, // Укажите максимальную высоту прокручиваемой области
  },
  infoContainer: {
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default InfoWindow;
