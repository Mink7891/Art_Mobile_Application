import {View, StyleSheet, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import React from 'react'

export default function VideoContainer({refVideo, videoIsMuted, source , handleStatusVideo}) {
  return (
    <View style={styles.taskVideo}>
      <Video style={styles.video}
        isMuted={videoIsMuted}
        ref={refVideo}
        source={{"uri" : source}}
        resizeMode="cover"
        shouldPlay
        onPlaybackStatusUpdate={status => handleStatusVideo(status)}
      >
      </Video>

    </View>
  )
}


const styles = StyleSheet.create({

  taskVideo: {
    padding: 0,
    margin: 0,

    width: Dimensions.get('window').width * 0.98,
    height: 300,
    backgroundColor: '#000'
  },

  video: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%'
  },



})