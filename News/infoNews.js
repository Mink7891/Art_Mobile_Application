import React, {useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions,ImageBackground} from "react-native";

const InfoNews = ({route, navigation}) => {
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');

  const data = route.params.newsInfo;


  const screenDimensions = Dimensions.get('screen');

  useEffect(() => {
    if (!data.news_desc.includes('http')) return setDesc(data.news_desc)
    const sliceStr = data.news_desc.split('http')
    setLink(`http${sliceStr.pop()}`);
    setDesc(sliceStr)
  }, [])

  return (
    <ImageBackground source={require('../assets/memoryCardBG.png')} style={{backgroundColor: '#FFF', flex: 1, paddingTop: 50}}>
      <SafeAreaView style={styles.modal}>
        <ScrollView>
          <View>
            <Text style={styles.modalTitle}>
              {data.news_title}
            </Text>
          </View>

          <View style={styles.infoNews}>
            <Text style={styles.textInformationNews}>
              Дата: {data.news_date + '\n'}
              Автор: {data.user_name + " " + data.user_surname}
            </Text>
          </View>

          <View style={styles.mainContent}>
            <Text adjustsFontSizeToFit={true} style={styles.textDescription}>
              {desc}
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL(link)}   >
              <Text style={styles.linkNews}>
                {link}
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{
                    width : screenDimensions.width - 100,

                    height: 350,
                    resizeMode: 'cover',
                    borderRadius: 24,
                    marginTop: 20,
                  }}
                  source={{uri: data.news_img}}
                  key={data.id}
                />
              </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 15,
  },
  buttonText: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    color: 'black',
    textDecorationLine: 'underline',
  },
  modalTitle: {
    
    fontSize: 25,
    marginBottom: 4,
    color: 'black'
  },
  infoNews: {
    marginTop: 5,
    marginBottom: 10,
  },
  textInformationNews: {
    fontSize: 16,
    lineHeight: 24,
  },
  mainContent: {
    flex: 1,
  },
  textDescription: {
    fontSize: 20,
    lineHeight: 22,
  },
  linkNews: {
    fontSize: 20,
    color: 'blue',
    marginTop: 10,
  }
})

export default InfoNews;
