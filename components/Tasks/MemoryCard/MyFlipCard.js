import React, { useEffect, useRef } from 'react';
import { View, Text , Image, StyleSheet, Animated} from 'react-native';







const MyFlipCard = ({card, handleChoise,flipped,disabled}) => {

    const handleClick = () => {
        if (!disabled && !flipped) {
            handleChoise(card)
        }
        
    }
    
    




    return (
        <View style={styles.card} onStartShouldSetResponder={handleClick}> 
            <View>
                {  /* Front Side */}
                <Image style={[styles.img]} source={{uri : card.img}}/>
                <Image style={[styles.back ,flipped ? styles.flipped : ""]} source={{uri : "https://i.pinimg.com/564x/fa/22/d9/fa22d998b1f03e8827aa6ef3a8be1bf1.jpg"}}></Image>
                {/* Back Side */}
                

            </View>
        </View>
    );
};

export default MyFlipCard;


const styles = StyleSheet.create({

    img : {
        
        width: '100%',
        height : '100%'
    },

    flipped : {

        transform: [{rotateY: '90deg'}],
        
    },


    front : {
        
        
        
        
    },


    

    back : {
        position : 'absolute',
        width: '100%',
        height : '100%'
    },


    card : {
        position : 'relative',
        width : 120,
        height : 120,
        
    }



})