
import { StyleSheet, Text, View, Dimensions, ImageBackground, Button } from 'react-native';
import Layout from '../components/layout';





export default function Tasks({navigation}) {


  return (


   
    <Layout>
        <View style={styles.container}>
            <View style={styles.containerChilds}>
                <View style={styles.gameButton}><Button  title='Quiz' onPress={() => navigation.navigate('Quiz')}></Button></View>
                <View style={styles.gameButton}><Button  title='Video Game' onPress={() => navigation.navigate('VideoGame')}></Button></View>
                <View style={styles.gameButton}><Button  title='MemoryCard' onPress={() => navigation.navigate('MemoryCard')}></Button></View>
            </View>
        </View>
    </Layout>
  


  
  );
}

const styles = StyleSheet.create({
  
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
   
    
  },

  containerChilds : {
    width : '100%'
  },


  gameButton : {
    marginBottom : 10
  }
  
});
