import {StyleSheet, Button, SafeAreaView, Text, TextInput, View, Alert, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorMessage, registrationUser, signupUser} from "../slice/authSlice";
import Loader from "../News/Loader";
import CustomButton from "../components/CustomButton";
import {useIsFocused, useNavigation} from "@react-navigation/native";

const Registration = () => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const {isFetching, isError, errorMessage} = useSelector(state => state.auth);


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [lastname, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState();
  const [education, setEducation] = useState();

  useEffect(() => {
    dispatch(clearErrorMessage())
      if (isError && isFocus) {
        const error = errorMessage[0]?.msg || errorMessage?.message;
        Alert.alert(
          'Возникла ошибка',
          `${error}`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
      }
    }, [isFocus, errorMessage]
  )

  const handlerRegistration = () => {
    dispatch(registrationUser({
      name,
      surname,
      lastname,
      login,
      password,
      email,
      phone,
      age,
      education
    })).then((res) => {
      if (res.payload?.status === 200) {
        Alert.alert(
          'Ваш профиль успешно создан',
          `Войдите в него и подтвердите аккаунт по почте.`,
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
        );
        navigation.navigate('Login');
      }
    })
  }

  return (
    <View style={{flex: 1}}>

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
              Регистрация
            </Text>
          </View>

          <View style={styles.wrapperInput}>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Имя"
                placeholderTextColor='#B3C19F'
                value={name}
                onChangeText={(e) => setName(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Фамилия"
                placeholderTextColor='#B3C19F'
                value={surname}
                onChangeText={(e) => setSurname(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Отчество"
                placeholderTextColor='#B3C19F'
                value={lastname}
                onChangeText={(e) => setLastName(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Логин"
                value={login}
                placeholderTextColor='#B3C19F'
                onChangeText={(e) => setLogin(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Пароль"
                placeholderTextColor='#B3C19F'
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Электронная почта"
                placeholderTextColor='#B3C19F'
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Номер телефона"
                placeholderTextColor='#B3C19F'
                value={phone?.toString()}
                onChangeText={(e) => setPhone(e)}
              />
            </View>
            <View style={{...styles.TextInputForm, marginBottom: 10}}>
              <TextInput
                style={styles.TextInput}
                placeholder="Возраст"
                placeholderTextColor='#B3C19F'
                value={age?.toString()}
                onChangeText={(e) => setAge(e)}
              />
            </View>
            <View style={styles.TextInputForm}>
              <TextInput
                style={styles.TextInput}
                placeholder="Образование"
                placeholderTextColor='#B3C19F'

                value={education?.toString()}
                onChangeText={(e) => setEducation(e)}
              />
            </View>
          </View>

          <View style={styles.wrapperButton}>
            <CustomButton
              onPress={handlerRegistration}
              title={'Создать профиль'}
              sizeButton={'50%'}
            />

            <View style={styles.containerTextRegInfo}>
              <Text style={styles.textRegInfo}>
                Уже есть аккаунт?
              </Text>
              <TouchableOpacity style={{borderBottomColor: 'white', borderBottomWidth: 1, marginLeft: 6}}
                                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textRegInfo}>Войти</Text>
              </TouchableOpacity>
            </View>

          </View>



        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 5,
    backgroundColor: 'black',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '75%',
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
  buttonReg: {
    flex: 1,
  },
  wrapperButton: {
    alignItems: 'center',
    marginBottom: 10,
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
});

export default Registration;
