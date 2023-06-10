import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Button} from 'react-native';
import {answerByUser, fetchAchievementAdd, fetchData} from '../../../API/tasks.api';

import QuizQuestion from './QuizQuestion';
import {useDispatch, useSelector} from 'react-redux';
import FinishElement from "../FinishElement";
import {updateRate} from "../../../store/slice/authSlice";


export default function Quiz() {
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState(null)
  const [step, setStep] = useState(0)
  const [nextButton, setNextButton] = useState(false)
  const [answer, setAnswer] = useState(false)
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(false)
  const [chooseButton, setChooseButton] = useState(-1)
  const {accessToken} = useSelector((state) => state.auth.userInfo);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }


  const onClickVariant = async (index) => {
    setDisable(true)
    setAnswer(true)
    setChooseButton(index)
    if (quiz[step].task_correct_answer === index) {
      setScore(prevState => prevState + 1);
      const response = await answerByUser(quiz[step].task_id, index, accessToken);
      if (!response.data[0]?.new_ans) {
        console.log('Update rate');
        await dispatch(updateRate(1));
      }
    } else {
      console.log("Неправильно")
    }
    setNextButton(true)
  }

  const nextQuestion = () => {
    setStep(step + 1)
    setNextButton(false)
    setAnswer(false)
    setDisable(false)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData(accessToken);
        setQuiz(shuffle(fetchedData))

      } catch (error) {
        console.log(error)
      }

    }
    getData()

  }, [])


  useEffect(() => {

    async function achievementAdd() {
      if (step) {
        if (score === quiz.length) {
          await fetchAchievementAdd(accessToken, 2)
        }
      }
    }

    achievementAdd()
  }, [step])


  return (
    <ImageBackground
      source={require('../../../assets/QuizBG.png')}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.variants_container}>
        {quiz
          ? step !== quiz.length
            ? <QuizQuestion chooseButton={chooseButton} isDisable={disable} onClickVariant={onClickVariant}
                            question={quiz[step]}/>
            : <FinishElement countQuestion={step} result={score}/>
          : <Text>Загрузка...</Text>}
        {answer ? <Text style={styles.answerContainer}>{quiz[step].task_correct_desc}</Text> : <></>}
        {nextButton ? <Button title='Следующий вопрос' onPress={() => nextQuestion()}></Button> : <></>}
        <StatusBar style="auto"/>
      </View>


    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  variants_container: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'

  },

  answer_container: {
    marginTop: 25,
    backgroundColor: '#fff',


  },


  imageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },


  answerContainer: {
    fontFamily: 'Calibri',
    margin: 10,
    marginBottom: 20
  }
});
