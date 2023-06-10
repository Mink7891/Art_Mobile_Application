import React, {useEffect} from 'react';
import {StyleSheet, Button, Image, Text, View, ImageBackground, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/slice/authSlice";
import Loader from "../../News/Loader";
import LinePersonInformation from "../LinePersonInformation";
import {useNavigation} from "@react-navigation/native";
import LinePersonAchievement from "../LinePersonAchievement.js"


const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo, isFetching, token, isError, isAuth } = useSelector((state) => state.auth);


  const logOutButton = () => {
    dispatch(logOut());
  }


  return (
    <ScrollView style={styles.container}>
      
      {isFetching && <Loader />}
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/patternBackground.png')}
          resizeMode='cover'
          style={styles.imageBackground}
        >
          <View style={styles.containerAvatar}>
            <Image style={styles.avatarImg} source={{ uri: userInfo?.user_photo }} />
          </View>

          <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>
              Добро пожаловать, {userInfo?.user_name}
            </Text>
            <Text style={styles.textScore}>
              Ваш рейтинг: {userInfo?.user_rating}
            </Text>

            <TouchableOpacity style={{
              marginTop: 15
            }} onPress={() => navigation.navigate('Train')}>
              <Text style={{
                fontSize: 20,
                color: 'white',
                backgroundColor: 'rgba(208,108,108,0.64)',
                padding: 5,
                borderRadius: 10
              }}>
                🚂 Поезд времени
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.content}>

        <LinePersonInformation
          label='ФИО'
          info={`${userInfo?.user_name} ${userInfo?.user_surname} ${userInfo?.user_lastname}`}
        />

        <LinePersonInformation
          label='Электронная почта'
          info={userInfo?.user_email}
        />

        {/*<LinePersonInformation*/}
        {/*  label='Возраст'*/}
        {/*  info={userInfo?.user_age}*/}
        {/*/>*/}

        {/*<LinePersonInformation*/}
        {/*  label='Телефон'*/}
        {/*  info={userInfo?.user_phone}*/}
        {/*/>*/}

        {/*<LinePersonInformation*/}
        {/*  label='Образование'*/}
        {/*  info={userInfo?.user_education}*/}
        {/*/>*/}


        <LinePersonAchievement
          label='Достижения'
        />

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.exitButton} onPress={logOutButton}>
            <Text style={{ color: 'white' }}>
              Выйти
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    overflow: 'hidden',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  imageBackground: {
    flex: 1,
  },
  containerAvatar: {
    alignItems: 'center',
    marginTop: 20
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  containerTitle: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    width: '90%',
    borderRadius: 10,

    marginTop: 10
  },
  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: 'white',
    textShadowColor: 'rgba(23,23,23,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'rgba(23,23,23,0.75)',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
  content: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
  },
  containerButton: {
    flex: 1,
    alignItems: 'center'
  },
  exitButton: {
    width: 100,
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
})

export default Profile;
