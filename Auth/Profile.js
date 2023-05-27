import React, {useEffect} from 'react';
import {Button, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as SecureStore from "expo-secure-store";
import {logOut} from "../slice/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const {userInfo, token, isError, isAuth} = useSelector((state) => state.auth);

  const logOutButton = () => {
    dispatch(logOut());
  }
  return (
    <View>
      <Text>
        Вы в профиле!
      </Text>
      {
        isAuth
          ? <Text>{userInfo.user_name}</Text>
          : null
      }
      <Button title={'Log Out'} onPress={logOutButton}/>
    </View>
  );
};

export default Profile;
