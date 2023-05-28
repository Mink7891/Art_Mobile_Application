import React from 'react';
import {View, Sa} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {ProfileButton} from "./iconButton";
import {useNavigation} from "@react-navigation/native";

const Header = () => {
  const navigtaion = useNavigation();

  return (
    // <SafeAreaView style={{flex: 1}}>
      <View style={{
        width: '100%',
        height: '10%',
      }}>


        {/* onPress, title, sizeButton */}
        <View style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-between'
        }}>
          <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
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
            <ProfileButton title='test2' sizeButton={25}/>
            <ProfileButton title='test2' sizeButton={25}/>
            {/*<IconButton title='test2' sizeButton={25}/>*/}
            {/*<IconButton title='test2' sizeButton={25}/>*/}
          </View>
          </SafeAreaView>
        </View>
        
      </View>
    // </SafeAreaView>
  );
};

export default Header;
