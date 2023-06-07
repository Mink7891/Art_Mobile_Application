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

import ProfilePage from "./pages/ProfilePage";
import Tasks from "./pages/Tasks";
import Quiz from "./components/Tasks/Quiz/Quiz";
import VideoGame from "./components/Tasks/VideoGame/VideoGame";
import MemoryCard from "./components/Tasks/MemoryCard/MemoryCard";

import MoscowMap from './components/FoldersScripts/MoscowMap';
import NewsLentaPage from "./pages/NewsLentaPage";
import InfoNews from "./News/infoNews";
import RatingPage from "./pages/RatingPage";

import VideoCoursesPage from "./pages/VideoCoursesPage";
import AdminPanel from "./components/SchoolAdminPanel/AdminPanel";
import AddNews from "./components/SchoolAdminPanel/AddNews";
import AddVideoCourse from "./components/SchoolAdminPanel/AddVideoCourse";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Navigate() {
  const {userInfo, isAuth} = useSelector((state) => state.auth);

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
        <Tab.Screen name="RatingUser" component={RatingPage} options={{
          title: 'Соревнования ',
          tabBarIcon: () => (
            <FontAwesome name="th-list" color='black' size={25}/>
          )
        }}/>
        <Tab.Screen name="Course" component={VideoCoursesPage} options={{
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

                {
                  userInfo?.user_role === 1
                    ? (<>
                        <Stack.Screen name='Profile' component={AdminPanel}/>
                        <Stack.Screen name='ProfileUser' component={ProfilePage} options={{
                          headerShown: true,
                          title: 'Профиль'
                        }}/>
                        <Stack.Screen name='AddNews' component={AddNews} options={{
                          headerShown: true,
                          title: 'Добавление новости'
                        }}/>
                        <Stack.Screen name='AddVideoCourse' component={AddVideoCourse} options={{
                          headerShown: true,
                          title: 'Добавление видео курса'
                        }}/>
                      </>
                    )
                    : (<Stack.Screen name='Profile' component={ProfilePage} options={{
                      headerShown: true,
                      title: 'Профиль'
                    }}/>)
                }
                <Stack.Screen name='InfoNews' component={InfoNews}/>
                <Stack.Screen name="Quiz" component={Quiz} options={{title: 'Викторина'}}/>
                <Stack.Screen name="VideoGame" component={VideoGame} options={{title: 'Вспомни фразу'}}/>
                <Stack.Screen name="MemoryCard" component={MemoryCard} options={{title: 'Карточки'}}/>
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
