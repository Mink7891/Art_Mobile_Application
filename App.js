import React from 'react';
import { Provider } from "react-redux";
import store from "./store/store";
import MainStack from './navigate';

// AppRegistry.registerComponent('App', () => Map1);

export default function App() {
  return (
    <Provider store={store}>
      <MainStack/>
    </Provider>

  );
}
