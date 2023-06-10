import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {useIsFocused} from "@react-navigation/native";
import {StyleSheet, FlatList, Text, View} from "react-native";
import Loader from "../../News/Loader";
import {useSelector} from "react-redux";


const RatingTable = () => {
  const isFocused = useIsFocused();
  const {userInfo} = useSelector((state) => state.auth);
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
  }, [isFocused])


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
            backgroundColor: 'rgba(0,0,0,0.1)',
            
            
}}>
            <Loader/>
          </View>
          : null
      }
      <View style={{
        flex: 1,
       
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 24,
        backgroundColor: 'rgba(200,200,200,0.39)',
        borderColor: 'black',
        
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          
        }}>
          {/*{*/}
          {/*  isLoading*/}
          {/*    ? <Loader/>*/}
          {/*    : null*/}
          {/*}*/}
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
            <View style={styles.line}>
              <View>
                <Text style={styles.text}>
                  {index + 1}
                </Text>
              </View>

              <View>
                {
                  userInfo?.user_id === item?.user_id
                    ? <Text style={{
                      ...styles.text,
                      color: 'rgb(32,220,5)',
                      fontWeight: '500'
                    }}>{`${item?.user_name} (Вы)`}</Text>
                    : <Text style={styles.text}>{item?.user_name}</Text>
                }
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
    color: 'black',
    fontSize: 15,
    
  },
  line:{
    flex: 1,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    
    paddingRight: 20,
    paddingLeft: 20,
  }
})

export default RatingTable;
