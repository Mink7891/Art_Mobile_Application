import React, {useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions,ImageBackground} from "react-native";

const screenDimensions = Dimensions.get('screen');

const InfoNews = ({route, navigation}) => {
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');

  const data = route.params.newsInfo;


  

  useEffect(() => {
    if (!data.news_desc.includes('http')) return setDesc(data.news_desc)
    const sliceStr = data.news_desc.split('http')
    setLink(`http${sliceStr.pop()}`);
    setDesc(sliceStr)
  }, [])

  return (
    <ImageBackground source={require('../assets/memoryCardBG.png')} style={{backgroundColor: '#FFF', flex: 1, paddingTop: 50}  } blurRadius={15}>
      <ScrollView>
        <SafeAreaView style={styles.modal}>
        
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
        
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 24,
    color: 'black',
    //textAlign: 'center',
    
  },
  infoNews: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    opacity: 0.9,

  },
  textInformationNews: {
    fontSize: 18,
    color: '#3C4043',
    
  },
  mainContent: {
    marginBottom: 24,
    
    
  },
  textDescription: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 24,
    color: '#202124',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    opacity: 0.9,
  },
  linkNews: {
    fontSize: 18,
    color: '#1A73E8',
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    opacity: 0.9,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#202124',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  image: {
    width: screenDimensions.width - 100,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 24,
  },
});


export default InfoNews;
