import {StyleSheet, Text, View, ActivityIndicator} from "react-native";

const Loader = () => {

  return (
    <View style={styles.wrapper}>
      {/* <Text style={styles.text}>Идет загрузка...</Text> */}
      <ActivityIndicator style={styles.loader}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40
  },
  text: {
    fontSize: 22
  },
  loader: {
    marginTop: 10,
  }
})

export default Loader;
