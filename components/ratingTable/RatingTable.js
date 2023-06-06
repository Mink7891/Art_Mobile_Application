import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {useIsFocused} from "@react-navigation/native";
import {StyleSheet, FlatList, Text, View, Dimensions} from "react-native";
import Loader from "../../News/Loader";

const d = Dimensions.get("screen");

const RatingTable = () => {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const response = await $api.get('rate/users');
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  

  useEffect(() => {
    fetchRate();
  }, [])


  return (
    <View style={{flex: 1}}>
      {
        isLoading
          ? <View style={{
            position: 'absolute',
            zIndex: 20,
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.48)'
          }}>
            <Loader/>
          </View>
          : null
      }


      <View style={{
        flex: 1,
        margin: 20,
        borderWidth: 3,
        padding: 10,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.39)',
        borderColor: 'rgb(255,255,255)',
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          {
            isLoading
              ? <Loader/>
              : null
          }
          <View>
            <Text style={styles.text}>
              Место
            </Text>
          </View>

          <View>
            <Text style={styles.text}>
              Имя пользователя
            </Text>
          </View>

          <View>
            <Text style={styles.text}>
              Рейтинг
            </Text>
          </View>
        </View>


        <FlatList
          data={users}
          style={styles.listStyle}
          renderItem={({item, index}) => (
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              borderBottomColor: 'rgb(255,255,255)',
              borderBottomWidth: 3,
              paddingRight: 20,
              paddingLeft: 20,
            }}>
              <View>
                <Text style={styles.text}>
                  {index + 1}
                </Text>
              </View>

              <View>
                <Text style={styles.text}>
                  {item?.user_name}
                </Text>
              </View>

              <View>
                <Text style={styles.text}>
                  {item?.user_rating}
                </Text>
              </View>

            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 15,
  }
})

export default RatingTable;
