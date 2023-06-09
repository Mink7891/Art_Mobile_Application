import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text} from "react-native";
import Achievement from './Achievement';
import { useSelector } from 'react-redux'
import { fetchAchievementsUser } from '../API/tasks.api';


const LinePersonAchievement = ({label}) => {
   
    const {accessToken} = useSelector((state) => state.auth.userInfo);
    const [achievements , setAchievements] = useState([])
    const [achievementsLoaded , setAchievementsLoaded] = useState(false)





    useEffect(() => {
        const getData = async() => {
          try {
            setAchievementsLoaded(false)
            const fetchedData = await fetchAchievementsUser(accessToken);
            setAchievements(fetchedData)
            setAchievementsLoaded(true)
            
           
           
            
            
            
          }
          catch (error) {
            console.log(error)
          }
    
        }
    
    
        getData()
    
      },[])




  return (
  
    <View style={styles.content}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.containerAchievements}>
      {setAchievementsLoaded ? achievements.map((item,index) => {return <Achievement key={index} achievement={item}/>}) : []}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.17)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    marginBottom: 20
  },

  containerAchievements : {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  label: {
    color: 'rgba(28,28,28,0.78)',
    fontSize: 14,
  },
  text: {
    fontSize: 16
  }
})

export default LinePersonAchievement;
