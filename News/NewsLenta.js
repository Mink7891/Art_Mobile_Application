import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity, Button

} from "react-native";
import React, {useEffect, useState} from "react";
import Loader from "./Loader";
import {useSelector} from "react-redux";

const screenDimensions = Dimensions.get('screen');

const News = ({navigation}) => {

  const {userInfo, token, isAuth} = useSelector((state) => state.auth);

  const [news, setNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    async function fetchNews() {
      await fetch("http://localhost:8080/api/news")
        .then((response) => response.json())
        .then((result) => {
          setNews(result)
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

  }, [])


  return (
    <SafeAreaView style={stylesMain.wrapper}>
      <Button title="Профиль" onPress={() => navigation.navigate('Profile')}/>
      <View>
        {isLoading
          ? <Loader/>
          : <FlatList data={news} renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('InfoNews', {
              item
            })}>
              <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.news_img}}
                    key={item.id}
                    style={styles.image}
                  />
                  <Text style={styles.title}>
                    {item.news_title?.split(' ').length > 5
                      ? item.news_title?.split(' ')?.slice(0, 5) + ' ...'
                      : item.news_title
                    }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
          }/>
        }
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
    height: 240,
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
    height: 300,
    width: screenDimensions.width - 20,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 5,
    fontSize: 28,
    fontWeight: 600,
    color: 'white',
  }
})

export default News;
