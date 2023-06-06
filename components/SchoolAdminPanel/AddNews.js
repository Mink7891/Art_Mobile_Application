import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';


// news_id
// news_title
// news_desc
// news_img
// news_author
// news_date

const AddNews = ({route}) => {
  const [newsDesc, setNewsDesc] = useState('' +
    'fdslfkjdsflkjsdfklsdjflkdsjflsdkfjdklsfjsdlkfjdslkfjsdlkfjdsklfjsdklfjslfjdslkfjsdlfjsdkflsdjkflsdjfklsdjfldksjfdlsfjsdlkfjdslfjsdlfjsklfjsdklfjsdlkfskj');
  const [newsImg, setNewsImg] = useState(null);
  const [newsAuth, setNewsAuth] = useState(route.params?.auth_id);
  const [newsDate, setNewsDate] = useState(
    new Date().toLocaleString()
  ); // auto current data


  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewsImg(result.assets[0].uri);
      let formData = new FormData();
      formData.append('photo', {uri: newsImg?.uri, name: 'Img News'})
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

        <TouchableOpacity onPress={selectImage} style={{marginTop: 20}}>
          <Text style={{fontSize: 20, color: 'blue'}}>Загрузить изображение</Text>
        </TouchableOpacity>
  
        <Image style={{
          width: 250,
          height: 200
        }} source={{uri: newsImg}}/>

        <View style={{...styles.TextInputForm, marginBottom: 10}}>
          <Text style={{
            fontSize: 20,
            fontWeight: 500
          }}>
            Дата:
          </Text>
          <Text>
            {newsDate}
          </Text>
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
