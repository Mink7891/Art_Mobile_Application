import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity, ActivityIndicator, Button

} from "react-native";
import React, {useEffect, useState} from "react";
import Loader from "./Loader";
import {useNavigation} from "@react-navigation/native";
import $api from "../http";
import Header from "../components/Header";
import axios from "axios";

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
      const response = await axios.get(`http://46.243.227.254:8080/news/${page}`)
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


  console.log(news?.length);

  const ListEndLoader = () => {
    if (isLoading) {
      return <ActivityIndicator size={'large'} />;
    }
  };


  return (
    <SafeAreaView style={stylesMain.wrapper}>
      <Header/>
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
          style={{
            marginBottom: 60
          }}
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
                    resizeMode='stretch'
                    style={styles.image}

                  />
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    width: screenDimensions.width - 20,
                    paddingRight: 12,
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    height: 140,
                    backgroundColor: 'rgba(0,0,0,0.50)',
                    overflow: 'hidden'
                  }}>
                    <Text style={styles.title}>
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

const stylesMain = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF1C5',
  },
  list: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 8,
  }
})


// const boxShadow = Platform.select({
//   ios: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//   },
//   android: {elevation: 6},
// });

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '90%',
    backgroundColor: '#eee',
    marginBottom: 24,
    borderRadius: 24,
    // ...boxShadow
  },
  imageContainer: {
    flex: 1,
    position: 'relative'
  },
  image: {
    flex: 1,
    borderRadius: 24,
    height: 400,
    resizeMode: 'stretch',
    width: screenDimensions.width - 20,
  },
  title: {
    width: '100%',
    position: 'absolute',
    top: 5,
    left: 15,
    right: 5,
    fontSize: 28,
    fontWeight: 600,
    color: 'white',
  }
})

export default News;
