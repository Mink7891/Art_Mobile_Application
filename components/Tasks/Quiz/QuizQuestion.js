import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import FlatButton from './FlatButton';







export default function QuizQuestion({question, onClickVariant,isDisable,chooseButton}) {

  





  return (
    <View>
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{question.task_question}</Text>
        </View>
        <View style={styles.answers_block}>
            {question.task_answers.map((item,index) => {
                return <FlatButton chooseButton={chooseButton == index} isDisable={isDisable} key={item} onPress={() => onClickVariant(index)} text={item} correct={index == question.task_correct_answer}/>
            })}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

    questionContainer : {
        padding : 10
    },


    question : {
       textAlign : 'center',
       fontFamily : 'Calibri',
       fontSize : 20
    },



    answers_block: {
        marginTop : 20,
        justifyContent : 'center',
        alignItems : 'center'
    },

    answers_content : {
        padding : 10,
        margin : 10,
        width : 300,
        backgroundColor : '#fff',
        
        borderRadius : 20
    },
    answers_text : {
        fontFamily : 'Calibri'
    }
});
