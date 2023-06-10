import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity, ActivityIndicator,
  ImageBackground

} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import $api from "../http";

const screenDimensions = Dimensions.get('screen');

const News = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await $api.get(`/news/${page}`);
      setNews(news.concat(response.data));
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page])

  const newPage = () => {
    setPage(page + 1)
  }

  const ListEndLoader = () => {
    if (isLoading) {
      return <ActivityIndicator size={'large'}/>;
    }
  };

  return (
    

    <SafeAreaView style={styles.wrapper}>
      
      <View>
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
            <TouchableOpacity onPress={() => {
              navigation.navigate('InfoNews', {
                newsInfo: item,
                title: item.news_title,
              })
            }}>
              <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.news_img}}
                    key={item.id}
                   
                    style={styles.image}

                  />
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding : 10,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    height: 120,
                    backgroundColor: 'rgba(0,0,0,0.50)',
                    overflow: 'hidden'
                  }}>
                    <Text numberOfLines={4} style={styles.title} >
                      {item.news_title}
                    </Text>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
          )
          }
          onEndReached={newPage}
          onEndReachedThreshold={0.4}
          istFooterComponent={ListEndLoader}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
    },
    errorText: {
      fontSize: 24,
      color: "red",
    },
    container: {
      marginVertical: 10,
      borderRadius: 24,
      overflow: "hidden",
      elevation: 4,
    },
    imageContainer: {
      position: "relative",
    },
    image: {
      width: screenDimensions.width,
      height: 300,
    },
    overlay: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      padding: 10,
      height: 120,
      backgroundColor: "rgba(0,0,0,0.50)",
      overflow: "hidden",
      justifyContent: "flex-end",
    },
    title: {
      fontSize: 18,
      color: "#FFFFFF",
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      
  
    },
  });


export default News;
