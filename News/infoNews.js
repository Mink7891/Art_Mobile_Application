import React, {useEffect, useState} from 'react';
import {Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const InfoNews = ({route}) => {
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');

  const data = route.params.newsInfo;

  useEffect(() => {
    // navigation.setOptions({
    //   title: route.params.title
    // })
    const sliceStr = data.news_desc.split('http')
    setLink(`http${sliceStr.pop()}`);
    setDesc(sliceStr)
   

  }, [])

  return (
    <View style={{backgroundColor: '#FFF1C5', flex: 1, paddingTop: 50}}>
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
              Автор: {data.news_author}
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

              <Image
                style={{
                  width: '100%',
                  height: 400,
                  resizeMode: 'cover',
                  borderRadius: 24,
                  marginTop: 20,
                }}
                source={{uri: data.news_img}}
                key={data.id}
              />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
    fontSize: 36,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black'
  },
  infoNews: {
    marginTop: 15,
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
