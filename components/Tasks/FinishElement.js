import {StyleSheet, View, Text} from "react-native";

const FinishElement = ({countQuestion, result}) => {
  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20
      }
      }>
        Ваш результат:
      </Text>

      <Text style={styles.text}>
        {result} из {countQuestion}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  text: {
    fontSize: 22,
  }
})

export default FinishElement;
