import {StyleSheet, View, TextInput, SafeAreaView, Text, Alert, Button, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {clearErrorMessage, signupUser} from "../slice/authSlice";
import Loader from "../News/Loader";
import CustomButton from "../components/CustomButton";
import {useNavigation, useIsFocused} from "@react-navigation/native";


const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const {isFetching, isError, errorMessage} = useSelector(state => state.auth);

  useEffect(() => {
      dispatch(clearErrorMessage())
      if (isError && isFocus) {
        Alert.alert(
          'Возникла ошибка',
          `${errorMessage}`,
          [
            {
              text: 'Okey',
              style: 'cancel',
            },
          ],
        );
      }
    }, [isFocus, errorMessage]
  )


  const authUser = () => {
    dispatch(signupUser({login, password}))
      .then(async (res) => {
        if (res.payload?.status === 200) {
          // await SecureStore.setItemAsync('token', res.payload?.accessToken);
          navigation.navigate('Course')
        }
      })
  }


  return (
    <View style={styles.container}>

      {
        isFetching
          ? <View style={styles.loaderWrapper}>
            <Loader/>
          </View>
          : null
      }

      <SafeAreaView style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Вход в аккаунт
            </Text>
          </View>

          <View style={styles.wrapperInput}>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Логин"
                placeholderTextColor='white'
                value={login}
                onChangeText={(e) => setLogin(e)}
              />
            </View>
            <View style={styles.TextInputForm}>
              <TextInput
                style={styles.TextInput}
                placeholder="Пароль"
                placeholderTextColor='white'
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={true}
              />
            </View>
          </View>


          <View style={styles.regInfo}>
            <View style={styles.wrapperButton}>
              <CustomButton
                onPress={authUser}
                title={'Войти'}
                sizeButton={'35%'}
              />
            </View>
            <View style={styles.containerTextRegInfo}>
              <Text style={styles.textRegInfo}>
                Нет аккаунта?
              </Text>
              <TouchableOpacity style={{borderBottomColor: 'white', borderBottomWidth: 1, marginLeft: 6}}
                                onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.textRegInfo}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </View>

  );
};

const styles = StyleSheet.create({

  container : {
    flex : 1,
    justifyContent : 'center',
    width : '100%',
    height : '100%'
  },

  
  content: {
    
    width: '100%',
    justifyContent : 'center',
    height: 300,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.45)'
  },
  title: {
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 30,
    color: 'white'
  },
  wrapperInput: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center'
  },
  TextInputForm: {
    width: '86%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingTop: 10,
  },
  TextInput: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'auto',
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    flex: 1,
    zIndex: 10,
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  regInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTextRegInfo: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
  textRegInfo: {
    fontSize: 16,
    // marginLeft: 5,
    color: 'white'
  }
})

export default Login;
