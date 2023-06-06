import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, Linking, ImageBackground, ScrollView} from 'react-native';
import styles from './VideoCoursesStyles';


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

const VideoCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleVideoPress = (url) => {
    Linking.openURL(url);
  };


  const handleCategoryFilter = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredVideos = selectedCategory
    ? videos.filter((video) => video.category === selectedCategory)
    : videos;

  return (

    <ScrollView style={styles.container}>
      <ImageBackground source={require('../assets/pattern22.png')} style={styles.backgroundImage} blurRadius={15}>
        <View style={styles.filterContainer}>
        
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === 'Хореография' && styles.activeFilterButton]}
            onPress={() => handleCategoryFilter('Хореография')}
          >
            
            <Text
              style={[styles.filterButtonText, selectedCategory === 'Хореография' && styles.activeFilterButtonText]}>
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
              <View style={styles.imageContainer}>
                <Image source={video.image} style={styles.image}/>
              </View>

              <View style={styles.overlay}>
                <Text style={styles.title}>{video.title}</Text>
                <Text style={styles.description}>{video.description}</Text>
              </View>

            </TouchableOpacity>
            
          ))}
        </View>

      </ImageBackground>
    </ScrollView>

  );
};
/*
<View style={styles.overlay}>
                <Text style={styles.title}>{video.title}</Text>
                <Text style={styles.description}>{video.description}</Text>
              </View>*/
export default VideoCourses;
