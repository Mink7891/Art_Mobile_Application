import React from 'react';
import { Provider } from "react-redux";
import store from "./store/store";
import MainStack from './navigate';
import { useFonts } from 'expo-font';

// AppRegistry.registerComponent('App', () => Map1);

export default function App() {


  const [loaded] = useFonts({
    Calibri: require('./assets/fonts/Calibri.ttf'),
  });

  if (!loaded) {
    return null;
  }



  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>

  );
}
