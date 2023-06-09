import {Alert, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import $api from "../../http";
import Loader from "../../News/Loader";
import {useNavigation} from "@react-navigation/native";

const screenDimensions = Dimensions.get('screen');

// http://localhost:8080/news/delete
//   в параметрах news_id указывать

const ListNews = ({route, navigation}) => {
  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await $api.post('/news/my', {
        user_id: route.params.user_id
      });
      setNews(response.data);
    } catch (e) {
      setError(e.response.data)
    } finally {
      setIsLoading(false);
    }
  }

  const deleteNews = async (id) => {
    try {
      const response = await $api.delete('/news/delete', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          'news_id': id
        }
      })
      fetchData()
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data);
    }
  }

  const confirmDeleteNews = (news_id) => {
    Alert.alert('Вы уверены, что хотите удалить новость?', 'Подтвердите действие', [
      {
        text: 'Отмена'
      }, {
        text: 'Удалить',
        onPress: async () => deleteNews(news_id)
      }
    ])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView>
      {isLoading && <Loader/>}
      <View style={{
        marginTop: 10
      }}>
        {
          error
            ? <Text style={{fontSize: 24, color: 'red'}}>
              {error}
            </Text>
            : null
        }
        <FlatList
          data={news}
          showDefaultLoadingIndicators={true}
          renderItem={({item}) => (
            <View style={{
              alignSelf: 'center',
              borderRadius: 15,
              width: screenDimensions.width - 70,
              backgroundColor: 'rgba(225,225,225,0.7)'
            }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('InfoNews', {
                  newsInfo: item,
                  title: item.news_title,
                })
              }} style={{
                alignItems: 'center',
              }}>
                <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{uri: `${item?.news_img}`}}
                      key={item.id}
                      style={styles.image}
                    />
                    <View style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      left: 0,
                      padding: 10,
                      borderBottomLeftRadius: 24,
                      borderBottomRightRadius: 24,
                      height: 120,
                      backgroundColor: 'rgba(0,0,0,0.50)',
                      overflow: 'hidden'
                    }}>
                      <Text numberOfLines={4} style={styles.title}>
                        {item.news_title}
                      </Text>
                    </View>

                  </View>
                </View>
              </TouchableOpacity>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingBottom: 10
              }}>

                <TouchableOpacity onPress={() => navigation.navigate('EditNews', {
                  news: item
                })}>
                  <Text style={styles.text}>
                    Редактировать
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDeleteNews(item?.news_id)}>
                  <Text style={styles.text}>
                    Удалить
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          )
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: screenDimensions.width - 115,
    height: 280,
    backgroundColor: '#eee',
    marginBottom: 24,
    borderRadius: 24,

    // ...boxShadow
  },
  imageContainer: {
    flex: 1,
    position: 'relative',

  },
  image: {
    flex: 1,
    borderRadius: 24,
    height: 400,
    resizeMode: 'stretch',

  },
  title: {
    width: '100%',
    position: 'absolute',
    top: 5,
    left: 15,
    right: 5,
    fontSize: 20,
    fontWeight: 600,
    color: 'white',
  },
  text: {
    fontSize: 18
  }
})

export default ListNews;
