import React from 'react';
import Registration from "../Auth/Registration";
import {ImageBackground, StyleSheet} from "react-native";
import Layout from "../components/layout";

const RegistrationPage = () => {
  return (
    <Layout>
      <Registration/>
    </Layout>
  )
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default RegistrationPage;
