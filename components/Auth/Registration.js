import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorMessage, registrationUser, signupUser} from "../../store/slice/authSlice";
import Loader from "../../News/Loader";
import CustomButton from "../CustomButton";
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

  const [step, setStep] = useState(1);

  useEffect(() => {
      setStep(1);
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

  function firstStepReg() {
    return (
      <View style={{
        flex: 1
      }}>
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
        </View>
        <View style={{
          alignItems: 'center'
        }}>
          <CustomButton
            onPress={() => setStep(prevState => prevState + 1)}
            title={'Далее'}
            sizeButton={'40%'}
          />
        </View>

      </View>
    )
  }

  function secondStepReg() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Регистрация
          </Text>
        </View>
        <View style={{...styles.wrapperInput, justifyContent: 'center'}}>
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

        <View style={{
          alignItems: 'center'
        }}>
          <CustomButton
            onPress={() => setStep(prevState => prevState + 1)}
            title={'Далее'}
            sizeButton={'40%'}
          />

          <TouchableOpacity onPress={() => setStep(prevState => prevState - 1)}>
            <Text style={{
              fontSize: 18,
              color: 'white'
            }}>
              Назад
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  function thirdStepReg() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Регистрация
          </Text>
        </View>
        <View style={{...styles.wrapperInput, justifyContent: 'center'}}>
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
        </View>

        <View style={{
          alignItems: 'center'
        }}>
          <CustomButton
            onPress={handlerRegistration}
            title={'Зарегистрироваться'}
            sizeButton={'55%'}
          />

          <TouchableOpacity onPress={() => setStep(prevState => prevState - 1)}>
            <Text style={{
              fontSize: 18,
              color: 'white'
            }}>
              Назад
            </Text>
          </TouchableOpacity>
        </View>


      </View>
    )
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

      <ScrollView keyboardShouldPersistTaps='handled' style={styles.wrapper}>

        <View style={styles.content}>

          {step === 1 && firstStepReg()}
          {step === 2 && secondStepReg()}
          {step === 3 && thirdStepReg()}


          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            <View style={step >= 1 ? {...styles.block, backgroundColor: 'green'} : styles.block}></View>
            <View style={step >= 2 ? {...styles.block, backgroundColor: 'green'} : styles.block}></View>
            <View style={step === 3 ? {...styles.block, backgroundColor: 'green'} : styles.block}></View>
          </View>


          <View style={styles.wrapperButton}>

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

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center'
    paddingTop: '25%',
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
    height: 400,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingBottom: 10,
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
    // flex: 1,
  },
  wrapperButton: {
    // flex: 1,
    alignItems: 'center',

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
  },
  block: {
    borderRadius: 20,
    marginRight: 10,
    width: 70,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default Registration;
