import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'



export default function Achievement({ achievement }) {


    const [modalVisible, setModalVisible] = useState(false);


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };



    return (

        <View style={styles.container}>
            {console.log(achievement)}
            <View>
                {/* <Text>{achievement.achievement_title}</Text> */}
            </View>
            <TouchableOpacity onPress={() => { openModal() }}>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: achievement.achievement_img }} style={styles.img}></Image>
                </View>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={() => { closeModal() }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ textAlign: 'center' }}>{achievement.achievement_title}</Text>
                            <Text style={{ marginTop: 10 }}>{achievement.achievement_desc}</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={{ textAlign: 'center', marginTop: 20 }}>Закрыть</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>


    )
}



const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        width: '50%',
    },

    imgContainer: {
        width: 100,
        height: 100
    },


    img: {
        width: '100%',
        height: '100%'
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },


})