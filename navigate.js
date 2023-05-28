import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import {useSelector} from "react-redux";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import EmptyPage from "./pages/EmptyPage";
import Profile from "./Auth/Profile";

import Tasks from "./pages/Tasks";
import Quiz from "./components/Tasks/Quiz/Quiz";
import VideoGame from "./components/Tasks/VideoGame/VideoGame";
import MemoryCard from "./components/Tasks/MemoryCard/MemoryCard";

import MoscowMap from './FoldersScripts/MoscowMap';
import NewsLentaPage from "./pages/NewsLentaPage";
import NewsLenta from "./News/NewsLenta";
import InfoNews from "./News/infoNews";

import VideoCourses from "./pages/videoCourses";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Navigate() {
  const {isAuth} = useSelector((state) => state.auth);

  const Home = () => {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name="Tasks" component={Tasks} options={{
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
        <Tab.Screen name="Course" component={VideoCourses} options={{
          title: 'Видеокурсы ',
          tabBarIcon: () => (
            <AntDesign name="iconfontdesktop" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="MapsPage" component={MoscowMap} options={{
          title: 'Карта',
          unmountOnBlur: true,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="google-maps" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="NewsLenta" component={NewsLentaPage} options={{
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
                <Stack.Screen name='InfoNews' component={InfoNews}/>
                <Stack.Screen name="Quiz" component={Quiz} options={{title : 'Викторина'}}/>
                <Stack.Screen name="VideoGame" component={VideoGame} options={{title : 'Вспомни фразу'}}/>
                <Stack.Screen name="MemoryCard" component={MemoryCard} options={{title : 'Карточки'}}/>
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
