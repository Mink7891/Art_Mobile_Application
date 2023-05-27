import React from 'react';
import {Text, View} from "react-native";
import Layout from "../components/layout";
import Header from "../components/Header";

const EmptyPage = () => {
  return (
    <Layout>
      <Header/>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>
          Вы на пустой странице
        </Text>
      </View>
    </Layout>

  );
};

export default EmptyPage;
