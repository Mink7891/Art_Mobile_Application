import React from 'react';
import {ImageBackground, StyleSheet, View} from "react-native";
import Login from "../Auth/Login";
import NewsLenta from "../News/NewsLenta";
import Layout from "../components/layout";

const NewsLentaPage = () => {
  return (
    <Layout>
      <NewsLenta/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default NewsLentaPage;
