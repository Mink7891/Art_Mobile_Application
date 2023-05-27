import React, {useEffect} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";

const InfoNews = ({route}) => {
  const data = route.params.item;

  return (
    <View style={{backgroundColor: '#FFF1C5', flex: 1}}>
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
              {data.news_desc}
            </Text>
            <Image
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'stretch',
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
  }
})

export default InfoNews;
