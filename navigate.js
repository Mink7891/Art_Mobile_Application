import React from "react";
import NewsLenta from "./News/NewsLenta";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";


import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Registration from "./Auth/Registration";
import {useSelector} from "react-redux";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import EmptyPage from "./pages/EmptyPage";
import Profile from "./Auth/Profile";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Navigate() {
  const {isAuth} = useSelector((state) => state.auth);

  const Home = () => {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name="EmptyPage" component={EmptyPage} options={{
          title: 'Маршрут Заданий',
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="RatingUser" component={EmptyPage} options={{
          title: 'Соревнования ',
          tabBarIcon: () => (
            <FontAwesome name="th-list" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="Course" component={EmptyPage} options={{
          title: 'Видеокурсы ',
          tabBarIcon: () => (
            <AntDesign name="iconfontdesktop" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="MapsPage" component={EmptyPage} options={{
          title: 'Карта',
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="NewsLenta" component={EmptyPage} options={{
          title: 'Лента',
          tabBarIcon: () => (
            <Entypo name="news" color='black' size={25}/>
          )
        }}/>
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {
          isAuth ? (
              <>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Profile' component={Profile} options={{
                  headerShown: true
                }}/>
              </>
            )
            : (
              <>
                <Stack.Screen name={'Login'} component={LoginPage}/>
                <Stack.Screen name={'Registration'} component={RegistrationPage}/>
              </>
            )
        }


      </Stack.Navigator>
    </NavigationContainer>
  );
}
