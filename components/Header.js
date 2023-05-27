import React from 'react';
import {SafeAreaView, View} from "react-native";
import CustomButton from "./CustomButton";
import IconButton, {ProfileButton} from "./iconButton";
import {useNavigation} from "@react-navigation/native";

const Header = () => {
  const navigtaion = useNavigation();

  return (
    // <SafeAreaView style={{flex: 1}}>
      <View style={{
        width: '100%',
        height: '8%',
        backgroundColor: 'violet',
      }}>


        {/*onPress, title, sizeButton*/}
        <View style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-between'
        }}>
          <View>
            <ProfileButton
              onPress={() => navigtaion.navigate('Profile')}
              title='Профиль'
              sizeButton={25}
            />
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            {/*<IconButton title='test2' sizeButton={25}/>*/}
            {/*<IconButton title='test2' sizeButton={25}/>*/}
          </View>
        </View>

      </View>
    // {/*</SafeAreaView>*/}
  );
};

export default Header;
