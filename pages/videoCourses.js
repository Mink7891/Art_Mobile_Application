
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Linking, ImageBackground} from 'react-native';
import Header from "../components/Header";

const videos = [
  {
    id: 'video1',
    title: 'Хореографический отдел',
    description: 'ГБУДО г. Москвы ДШИ Вдохновение',
    category: 'Хореография',
    image: require('../assets/danceMSHI.jpg'),
    url: 'https://youtu.be/b4n5SDh17-Q?list=PLXhwhTO-T9tTfe_q_Z56XV0UYVkt92T0R',
  },
  {
    id: 'video2',
    title: 'Клинг Елизавета',
    description: 'Детская школа искусств имени Н.Н. Калинина',
    category: 'Пианино',
    image: require('../assets/piano.jpg'),
    url: 'https://youtu.be/AWtChUlG2Uw',
  },
  {
    id: 'video3',
    title: 'Диана Субботина',
    description: 'А.Комаровский - Русская песня (скрипка)',
    category: 'Скрипка',
    image: require('../assets/violinRUSSIAN.jpg'),
    url: 'https://youtu.be/QU_BP3PRCXI',
  },
  {
    id: 'video4',
    title: 'Научу тебя играть на гитаре за 10 минут',
    description: 'Экспресс курс по осноам игры на гитаре',
    category: 'Гитара',
    image: require('../assets/guitar.jpg'),
    url: 'https://youtu.be/GjVuiUoU9bw',
  },
 
];

const videoCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleVideoPress = (url) => {
    Linking.openURL(url);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredVideos = selectedCategory
    ? videos.filter((video) => video.category === selectedCategory)
    : videos; 

  return (
    
    <View style={styles.container}>
    <Header/>
    <ImageBackground source={require('../assets/pattern22.png')}style={styles.backgroundImage}>
      <View style={styles.filterContainer}>
        
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Хореография' && styles.activeFilterButton]}
          onPress={() => handleCategoryFilter('Хореография')}
        >
          <Text style={[styles.filterButtonText, selectedCategory === 'Хореография' && styles.activeFilterButtonText]}>
            Хореография
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Гитара' && styles.activeFilterButton]}
          onPress={() => handleCategoryFilter('Гитара')}
        >
          <Text style={[styles.filterButtonText, selectedCategory === 'Гитара' && styles.activeFilterButtonText]}>
            Гитара
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Пианино' && styles.activeFilterButton]}
          onPress={() => handleCategoryFilter('Пианино')}
        >
          <Text style={[styles.filterButtonText, selectedCategory === 'Пианино' && styles.activeFilterButtonText]}>
            Пианино
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedCategory === 'Скрипка' && styles.activeFilterButton]}
          onPress={() => handleCategoryFilter('Скрипка')}
        >
          <Text style={[styles.filterButtonText, selectedCategory === 'Скрипка' && styles.activeFilterButtonText]}>
            Скрипка
          </Text>
        </TouchableOpacity>
          
      </View>
    
      <View style={styles.videoContainer}>
        {filteredVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.card}
            onPress={() => handleVideoPress(video.url)}
          >
            <Image source={video.image} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.description}>{video.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    
       </ImageBackground>
    </View>
    
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    borderTOPColor: 'gray',
    borderTopWidth: 1,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    marginRight: 2,
    backgroundColor: '#FFFFFF',
    elevation: 5,

    
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#777777',


  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    
  },
  card: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        
        
    },
  
};

export default videoCourses;