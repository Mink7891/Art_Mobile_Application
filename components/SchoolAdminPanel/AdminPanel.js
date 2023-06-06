import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const AdminPanel = () => {
  const navigation = useNavigation();
  const {userInfo} = useSelector((state) => state.auth);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{
          fontSize: 26,
          fontWeight: 500
        }}>
          School Administrator Panel
        </Text>
        <Text style={{
          fontSize: 22
        }}>
          {userInfo?.user_name}
        </Text>
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
      }}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddNews', {
              auth_id: userInfo?.user_id
            })}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center'
            }}>
              Создать новость
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddVideoCourse', {
              auth_id: userInfo?.user_id
            })}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center'
            }}>
              Создать видеокурс
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    width: 150,
    height: 65,
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})

export default AdminPanel;
