import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, Linking, ImageBackground, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './VideoCoursesStyles';

//викторина - 1 вопрос - 1 балл всего 8
//вспомни фразу 1 вопрос - 2 балла всего 6


const videos = [
  {
    id: 'video1',
    rating: 0,
    title: 'Хореографический отдел',
    description: 'ГБУДО г. Москвы ДШИ Вдохновение',
    category: 'Хореография',
    image: require('../assets/danceMSHI.jpg'),
    url: 'https://youtu.be/b4n5SDh17-Q?list=PLXhwhTO-T9tTfe_q_Z56XV0UYVkt92T0R',
    platform: 'YouTube',
  },
  {
    id: 'video2',
    rating: 0,
    title: 'Nick Johnston - Weakened by Winter.',
    description: 'Ольга Крыскина',
    category: 'Гитара',
    image: require('../assets/prevGuitar.png'),
    url: 'https://rutube.ru/video/32eace56f088e144cec9be9e8c12e99e/?playlist=80852',
    platform: 'RUTUBE',
  },
  {
    id: 'video3',
    rating: 0,
    title: 'Клинг Елизавета',
    description: 'Детская школа искусств имени Н.Н. Калинина',
    category: 'Пианино',
    image: require('../assets/piano.jpg'),
    url: 'https://youtu.be/AWtChUlG2Uw',
    platform: 'YouTube',
  },
  {
    id: 'video4',
    rating: 0,
    title: 'Диана Субботина',
    description: 'А.Комаровский - Русская песня (скрипка)',
    category: 'Скрипка',
    image: require('../assets/violinRUSSIAN.jpg'),
    url: 'https://youtu.be/QU_BP3PRCXI',
    platform: 'YouTube',
  },
  {
    id: 'video5',
    rating: 0,
    title: 'Научу тебя играть на гитаре за 10 минут',
    description: 'Экспресс курс по осноам игры на гитаре',
    category: 'Гитара',
    image: require('../assets/guitar.jpg'),
    url: 'https://youtu.be/GjVuiUoU9bw',
    platform: 'YouTube',
  },
  {
    id: 'video6',
    rating: 0,
    title: 'Гала-концерт Городского конкурса «Ритмы Вселенной»',
    description: 'Открытый фестиваль «Поколение созидателей»',
    category: 'Хореография',
    image: require('../assets/horeogr1.png'),
    url: 'https://rutube.ru/video/ec93174e3b6d9ea1cf4b4bbc62c7a3cf/',
    platform: 'RUTUBE',
  },
  {
    id: 'video7',
    rating: 6,
    title: 'Праздничный концерт к Новому 2022 году',
    description: 'ГБОУДО им. А.В. Косарева',
    category: 'Хореография',
    image: require('../assets/horeogr2.png'),
    url: 'https://rutube.ru/video/1ee82dc0cc23254b78dbbc23ecabf093/',
    platform: 'RUTUBE',
  },
  {
    id: 'video8',
    rating: 0,
    title: '«Весенний букет»',
    description: 'Московская музыкальная школа им. Н.С. Голованова',
    category: 'Пианино',
    image: require('../assets/piano1.png'),
    url: 'https://rutube.ru/video/02629fe0bdb670a73b1d894a0730d546/',
    platform: 'RUTUBE',
  },
  {
    id: 'video9',
    rating: 6,
    title: 'Отчетный концерт отделения фортепиано',
    description: 'Московская музыкальная школа им. Н.С. Голованова',
    category: 'Пианино',
    image: require('../assets/piano2.png'),
    url: 'https://rutube.ru/video/068c4a39ed045b1234e50c58c44259cd/',
    platform: 'RUTUBE',
  },
  {
    id: 'video10',
    rating: 0,
    title: 'Выступление ДК Салют. Э.Меццакапо Болеро "Толедо"',
    description: 'Московская школа искусств им. Л.Н. Оборина',
    category: 'Скрипка',
    image: require('../assets/violin1.png'),
    url: 'https://rutube.ru/video/f8f4af27525468506373c95451c0e945/',
    platform: 'RUTUBE',
  },
  {
    id: 'video11',
    rating: 6,
    title: 'Эвита Корчинская. Выступление на конкурсе',
    description: 'Ф.Давид "Этюд", Ф.Крейслер "Сицилиана и Ригодон" 20.03.22',
    category: 'Скрипка',
    image: require('../assets/violin2.png'),
    url: 'https://rutube.ru/video/a0aa4a148ab5ec02b45be3778e26362b/',
    platform: 'RUTUBE',
  },


];

const VideoCourses = () => {
  const {user_rating} = useSelector((state) => state.auth);

  console.log(user_rating)
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
    ? videos.filter((video) => video.category === selectedCategory && video.rating <= user_rating)
    : videos.filter((video) => video.rating <=user_rating);

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
              <View style={video.platform === 'YouTube' ? styles.platformY : styles.platformR}>
                <Text style={{color: 'white'}}>{video.platform}</Text> 
              </View>
            </TouchableOpacity>
            
          ))}
        </View>

      </ImageBackground>
    </ScrollView>

  );
};

export default VideoCourses;
