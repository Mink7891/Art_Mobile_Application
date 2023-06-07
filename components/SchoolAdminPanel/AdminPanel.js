import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const AdminPanel = () => {
  const navigation = useNavigation();
  const {userInfo} = useSelector((state) => state.auth);


  return (
    <ImageBackground style={{
      flex: 1,
      width: '100%',
      height: '100%'
    }} source={require('../../assets/memoryCardBG.png')}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{
            fontSize: 26,
            fontWeight: 500,
            textAlign: 'center'
          }}>
            Панель Администратора Школы
          </Text>
          <Text style={{
            marginTop: 15,
            fontSize: 22,
            textAlign: 'center'
          }}>
            {userInfo?.user_name}
          </Text>
        </View>
        <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AddNews', {
                auth_id: userInfo?.user_id
              })}
            >
              <Text style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center'
              }}>
                Создать новость
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AddVideoCourse', {
                auth_id: userInfo?.user_id
              })}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center'
              }}>
                Создать видеокурс
              </Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileUser')}>
          <Text style={{
            color: 'blue',
            fontSize: 22,
            borderBottomWidth: 1,
            borderBottomColor: 'blue'
          }}>
            Перейти в профиль
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginTop: 100,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  button: {
    width: 150,
    height: 65,
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})

export default AdminPanel;
