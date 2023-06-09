import React from 'react';

import { StyleSheet, Text, View, Dimensions, ImageBackground, Button, TouchableOpacity } from 'react-native';
import Layout from '../components/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerChilds: {
    alignItems: 'stretch',
    opacity: 0.9
  },
  gameButton: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f7fffa',
    color: 'black',
    height: 100,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 12,
    backgroundColor: '#f6fff2',
    borderWidth: 1,
    borderColor: '#dfffd1',
    fontFamily: 'Calibri',
    shadowColor: 'white',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    elevation: 2,
    padding: 4
  },
});

const Tasks = ({ navigation }) => {
  return (
    <Layout>
     <View style={styles.container}>
      <View style={styles.containerChilds}>
      <TouchableOpacity style={styles.gameButton} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>⚙️</Text>
          <Text style={styles.buttonText}>Викторина</Text>

          </TouchableOpacity>
        <TouchableOpacity style={styles.gameButton} onPress={() => navigation.navigate('VideoGame')}>
          <Text style={styles.buttonText}>🎵</Text>

          <Text style={styles.buttonText}>Вспомни мелодию</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.gameButton} onPress={() => navigation.navigate('MemoryCard')}>
          <Text style={styles.buttonText}>🃏</Text>
          <Text style={styles.buttonText}>Карточки</Text>

          </TouchableOpacity>
      </View>
    </View>
    </Layout>
  );
};

export default Tasks;