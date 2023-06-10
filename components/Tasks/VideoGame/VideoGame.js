import React, {useEffect, useRef, useState} from 'react'
import {ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity, Button} from 'react-native';
import {Audio} from 'expo-av';
import {answerByUserVideo, fetchVideosContent} from '../../../API/tasks.api';
import VideoContainer from './VideoContainer';
import {useDispatch, useSelector} from 'react-redux';
import FinishElement from "../FinishElement";
import {fetchAchievementAdd} from "../../../API/tasks.api";
import {updateRate} from "../../../store/slice/authSlice";


export default function VideoGame() {


  const praises = ['Умничка!', 'Молодец! Всё правильно', 'У тебя хорошо получается!', 'Правильно!', 'Супер!']

  const wrongs = ['Звучит шедеврально, но персонажи в шоке', 'Отличная попытка!', 'Эх, думаю вам следует пересмотреть данный фрагмент', 'Вы правда так думаете???']

  const dispatch = useDispatch();
  const [step, setStep] = useState(0)
  const [answersVisible, setAnswersVisible] = useState(false)
  const soundRef = useRef()
  const video = React.useRef(null);
  const [pressButton, setPressButton] = useState(-1)
  const [videoIsMuted, setVideoIsMuted] = useState(true)
  const [activeButton, setActiveButton] = useState(false)
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState(false)
  const [nextQuestion, setNextQuestion] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [disableButtons, setDisableButtons] = useState(false)
  const [loadingVideo, setLoadingVideo] = useState(true)
  const [videoList, setVideoList] = useState()
  const {accessToken} = useSelector((state) => state.auth.userInfo);

  const soundPlay = async (music, i) => {

    setPressButton(i)
    setActiveButton(true)
    if (soundRef.current !== undefined) {
      soundRef.current.unloadAsync()
    }
    const {sound} = await Audio.Sound.createAsync({uri: music})
    soundRef.current = sound
    soundRef.current.playAsync()
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingVideo(true)
        const fetchedData = await fetchVideosContent(accessToken);
        setVideoList(fetchedData)
        setLoadingVideo(false)

        if (score === videoList?.length) {
            await fetchAchievementAdd(accessToken,3)
        }

      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [step])


  const handleStatusVideo = (status) => {
    if (video && pressButton === -1) {
      if (status.positionMillis >= 5000 && status.isPlaying === true) {
        video.current.pauseAsync()
        status.positionMillis = 0
        setAnswersVisible(true)
      }
    }
  }


  const nextButton = () => {
    setStep(step + 1)
    setWinner(false)
    setDisableButtons(false)
    setAnswersVisible(false)
    setVideoIsMuted(true)
    setNextQuestion(false)
    setWrongAnswer(false)
    setPressButton(-1)
  }


  const answerButton = async (index) => {
    setDisableButtons(true)
    if (index === videoList[step].currentanswer) {
      setScore(prevState => prevState + 1);
      const response = await answerByUserVideo(videoList[step].task_id, index, accessToken, accessToken)
      if (!response.data[0]?.new_ans) {
        dispatch(updateRate(2));
      }
      soundRef.current.pauseAsync()
      setAnswersVisible(false)
      setVideoIsMuted(false)
      setActiveButton(false)
      setWinner(true)
      video.current.replayAsync()
      setNextQuestion(true)
    } else {
      setNextQuestion(true)
      setWrongAnswer(true)
      setActiveButton(false)
    }
  }


  return (
    <ImageBackground resizeMode="cover" style={styles.backgroundImage}
                     source={require('../../../assets/videoGameBG.png')}>

      <View style={styles.taskContainer}>
        {loadingVideo ? <Text>Загрузка...</Text> : step !== videoList.length ? (
          <View style={styles.taskContainer}>
            {winner ?
              <Text style={styles.praises}>{praises[(Math.floor(Math.random() * praises.length))]}</Text> : <></>}
            <View>
              <VideoContainer refVideo={video} videoIsMuted={videoIsMuted} source={videoList[step].video}
                              handleStatusVideo={handleStatusVideo}></VideoContainer>
            </View>
            {video.current ? answersVisible ?
              <View style={styles.answersContainer}>{videoList[step].audioclips.map((music, i) => <TouchableOpacity
                disabled={disableButtons} activeOpacity={1}
                style={wrongAnswer && i === pressButton ? styles.wrongContainer : pressButton === i ? styles.selectButton : styles.unSelectButton}
                key={music} onPress={() => soundPlay(music, i)}><Text
                style={styles.answer}>Вариант {i + 1}</Text></TouchableOpacity>)}
              </View> : <></> : <></>}
            {activeButton ? <View><Button title='Ответить на вопрос' onPress={() => {
              answerButton(pressButton)
            }}></Button></View> : <></>}
            {wrongAnswer ? <View
              style={styles.wrongAnswer}><Text>{wrongs[(Math.floor(Math.random() * praises.length))]}</Text></View> : <></>}
            {nextQuestion ? <View style={styles.nextQuestion}><Button title='Следующее задание' onPress={() => {
              nextButton()
            }}></Button></View> : <></>}
          </View>) : <FinishElement countQuestion={step} result={score}/>}

      </View>


    </ImageBackground>
  )
}


const styles = StyleSheet.create({


  praises: {
    fontFamily: "Calibri",
    fontSize: 25,
    marginBottom: 15
  },

  answersContainer: {
    width: Dimensions.get('window').width * 0.9,
  },

  answer: {
    fontFamily: "Calibri"
  },

  backgroundImage: {
    width: '100%',
    height: '100%'
  },


  nextQuestion: {
    marginTop: 15
  },

  taskContainer: {
    marginTop: -60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },


  unSelectButton: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10
  },

  selectButton: {
    margin: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    padding: 10
  },


  endQuestions: {
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    top: '50%',
    fontFamily: 'Calibri',
    fontSize: 25,

  },

  wrongContainer: {
    margin: 10,
    backgroundColor: '#A52A2A',
    borderRadius: 20,
    padding: 10
  },

  wrongAnswer: {
    marginTop: 25,
    marginBottom: 25
  }
});




