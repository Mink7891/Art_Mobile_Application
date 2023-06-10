import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import $api from "../../http";


const AddNews = ({route}) => {
  const news_auth = route.params?.auth_id;
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDesc, setNewsDesc] = useState('');

  const [newsImg, setNewsImg] = useState('');
  const [newsLinkImg, setNewsLinkImg] = useState('');
  const [imageIsUpload, setImageIsUpload] = useState(false);

  const [newsDate, setNewsDate] = useState(new Date().toLocaleString());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const uploadImage = async () => {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("image", {uri: newsImg, name: `${Date.now()}.jpg`, type: 'image/jpg'})
      const response = await $api.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setNewsLinkImg(response.data.url)
      setImageIsUpload(true);
    } catch (e) {
      setImageIsUpload(false);
      setError(e.response.data);
      console.log(e.response.data)
    } finally {
      setIsLoading(false);
    }
  }

  const createNews = async () => {
    try {
      setIsLoading(true);
      const response = await $api.post('/news/create', {
        user_id: news_auth,
        news_title: newsTitle,
        news_desc: newsDesc,
        news_img: newsLinkImg
      })
      return successfullyAdd();
    } catch (e) {
      setError(e);
      console.log(e.response.data)
    } finally {
      setIsLoading(false);
    }
  }

  const successfullyAdd = () => {
    Alert.alert('Новость успешно создана', '', [
      {
        text: 'Отлично'
      }
    ])
  }

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewsImg(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
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


          <TouchableOpacity onPress={selectImage} style={{marginTop: 20}}>
            <Text style={{
              fontSize: 20,
              color: 'blue',
            }}>
              Выбрать изображение
            </Text>
          </TouchableOpacity>

          {
            !imageIsUpload && newsImg ? (
              <TouchableOpacity onPress={uploadImage} style={{marginTop: 20}}>
                <Text style={{
                  fontSize: 20,
                  color: 'red',
                }}>
                  Загрузить фотографию
                </Text>
              </TouchableOpacity>
            ) : null
          }

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
            {newsDate}
          </Text>
        </View>

        <View style={{
          marginTop: 30
        }}>
          {
            imageIsUpload && (
              <TouchableOpacity onPress={createNews} style={{
                backgroundColor: 'black',
                padding: 6,
                width: 150,
                borderRadius: 10
              }}>
                <Text style={{
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  Создать новость!
                </Text>
              </TouchableOpacity>
            )
          }
        </View>

      </View>
    </View>
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

export default AddNews;
