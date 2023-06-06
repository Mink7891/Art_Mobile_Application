import {StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ProfileButton} from "./iconButton";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

const Header = () => {
  const navigation = useNavigation();
  const {userInfo} = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SafeAreaView style={styles.positionButtons}>
          <View>
            <ProfileButton
              onPress={() => navigation.navigate('Profile')}
              title='Профиль'
              sizeButton={25}
            />
          </View>
          <View>
            <Text style={{fontSize: 18}}>Ваш рейтинг: {userInfo?.user_rating}</Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
  },
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  positionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Header;
