import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import React, {useState} from "react";
import $api from "../../http";

const EditNews = ({route}) => {
  const news = route.params.news;
  const [newsTitle, setNewsTitle] = useState(news.news_title);
  const [newsDesc, setNewsDesc] = useState(news.news_desc);

  const [newsImg, setNewsImg] = useState(news.news_img);
  const [newsLinkImg, setNewsLinkImg] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const editNews = async () => {
    try {
      setIsLoading(true);
      const response = await $api.put('news/update', {
        'news_id': news?.news_id,
        'news_title': newsTitle,
        'news_desc': newsDesc,
      })
      return successfullyEdit();
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  const successfullyEdit = () => {
    Alert.alert('Новость успешно изменена', '', [
      {
        text: 'Ок'
      }
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={{...styles.TextInputForm, marginBottom: 10}}>
          <Text style={{
            fontSize: 20,
            fontWeight: 500
          }}>
            Заголовок:
          </Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Заголовок"
            multiline={true}
            placeholderTextColor='#B3C19F'
            value={newsTitle}
            onChangeText={(e) => setNewsTitle(e)}
          />
        </View>

        <View style={{...styles.TextInputForm, marginBottom: 10}}>
          <Text style={{
            fontSize: 20,
            fontWeight: 500
          }}>
            Описание статьи:
          </Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Описание"
            multiline={true}
            placeholderTextColor='#B3C19F'
            value={newsDesc}
            onChangeText={(e) => setNewsDesc(e)}
          />
        </View>


        <View style={{
          marginTop: 10
        }}>
          {
            newsImg
              ? <Image style={{
                width: 250,
                height: 200
              }} source={{uri: newsImg}}/>
              : <View style={{
                width: 250,
                height: 200,
                borderWidth: 1,
                borderColor: 'black',
                justifyContent: 'center'
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 500
                }}>Тут будет ваша фотография!</Text>
              </View>
          }


          {/*  <TouchableOpacity onPress={selectImage} style={{marginTop: 20}}>*/}
          {/*    <Text style={{*/}
          {/*      fontSize: 20,*/}
          {/*      color: 'blue',*/}
          {/*    }}>*/}
          {/*      Загрузить изображение*/}
          {/*    </Text>*/}
          {/*  </TouchableOpacity>*/}
        </View>

        <View style={{...styles.TextInputForm, marginBottom: 10}}>
          <Text style={{
            fontSize: 20,
            fontWeight: 500,
            marginTop: 20
          }}>
            Дата:
          </Text>
          <Text>
            {news.news_date}
          </Text>
        </View>

        <View style={{
          marginTop: 30
        }}>
          <TouchableOpacity style={{
            backgroundColor: 'black',
            padding: 6,
            width: 150,
            borderRadius: 10
          }} onPress={editNews}>
            <Text style={{
              fontSize: 18,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Применить изменения
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  TextInputForm: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(47,47,47,0.82)'
  },
  TextInput: {
    fontSize: 16
  }
})

export default EditNews;
