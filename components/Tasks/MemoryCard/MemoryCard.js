import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button , ImageBackground} from 'react-native'
import MyFlipCard from './MyFlipCard'

export default function MemoryCard() {

    const [cards, setCards] = useState({})
    const [turns, setTurns] = useState(0)
    const [score, setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [oneChoice, setOneChoise] = useState(null)
    const [twoChoice, setTwoChoise] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    const memoryCards = [
        { "num": 0, "img": "https://i.pinimg.com/564x/d6/44/da/d644daec86ffb501d082dc83160a1bab.jpg", "isMatch": false },
        { "num": 1, "img": "https://i.pinimg.com/564x/77/24/9e/77249e3fdc8ad318be76fdfb910bad7e.jpg", "isMatch": false },
        { "num": 2, "img": "https://i.pinimg.com/736x/39/59/81/3959811dc0d8478f584f3221cfbf47a6.jpg", "isMatch": false },
        { "num": 3, "img": "https://i.pinimg.com/736x/29/76/ca/2976ca34de3f9a8e386d249bf12fed00.jpg", "isMatch": false },
        { "num": 4, "img": "https://i.pinimg.com/564x/ae/54/22/ae54220a2757ba52a3b7fd8092c2041a.jpg", "isMatch": false },
        { "num": 5, "img": "https://i.pinimg.com/564x/16/1b/8c/161b8c43e03cbb413217510a6930ccc4.jpg", "isMatch": false },

    ]

    const shuffleCards = (cards) => {
        setIsLoading(true)
        let shuffledArray = [...cards, ...cards].map((card, index) => ({ ...card, index }))
        shuffledArray.sort(() => Math.random() - 0.5) // shuffle
        setCards(shuffledArray)
        setIsLoading(false)

    }




    const restart = () => {

        setScore(0)
        setTurns(0)
        setGameOver(false)
        shuffleCards(memoryCards)
    }


    useEffect(() => {
        shuffleCards(memoryCards)
    }, [])


    const handleChoise = (card) => {
        oneChoice ? setTwoChoise(card) : setOneChoise(card)

    }


    useEffect(() => {
        if (score === memoryCards.length) {
            setGameOver(true)
        }
    }, [score])


    useEffect(() => {

        if (oneChoice && twoChoice) {
            setDisabled(true)
            if (oneChoice.num == twoChoice.num) {
                setScore(score + 1)
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.index === oneChoice.index || card.index === twoChoice.index) {

                            return { ...card, "isMatch": true }
                        }
                        else {
                            return card
                        }
                    })
                })

                resetTurn()
            }
            else {
                setTimeout(() => {
                    resetTurn()
                }, 500)

            }
        }
    }, [oneChoice, twoChoice])




    const resetTurn = () => {
        setTurns(turns + 1)
        setOneChoise(null)
        setTwoChoise(null)
        setDisabled(false)
    }

    return (
        <ImageBackground
            source={require('../../../assets/memoryCardBG.png')}
            style={styles.imageBackground}
            resizeMode="cover">
            {gameOver &&
                <View style={styles.gameOverContainer}>
                    <View style={styles.gameOver}>
                        <Text style={styles.gameOverText}>Ты выйграл</Text>
                        <Text style={styles.turns}>Количество ходов : {turns}</Text>
                        <Button title='Рестарт' style={styles.gameOverBtn} onPress={restart}></Button>
                    </View>
                </View>}
            <View style={styles.container}>

                <View style={styles.cardsContainer}>
                    {!isLoading ? cards.map((card,index) =>
                        <MyFlipCard
                            key={index}
                            handleChoise={handleChoise}
                            card={card}
                            flipped={card === oneChoice || card === twoChoice || card.isMatch}
                            disabled={disabled}

                        >
                        </MyFlipCard>) : <Text>Загрузка...</Text>}
                </View>
                <View>

                </View>
            </View>
        </ImageBackground>
    )
}




const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',


    },

    imageBackground: {
        width : '100%',
        height : '100%'
      },

    cardsContainer: {
        gap: 5,
        position: 'relative',
        top: '25%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },


    gameOverContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 10,
        position: 'absolute',
        top: 0,
        opacity: 1,



    },


    gameOverText: {
        fontFamily: 'Calibri',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20
    },


    gameOverBtn: {
        textAlign: 'center',
        alignItems: 'center',


    },


    gameOver: {
        padding: 25,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center'
    },


    turns: {
        fontFamily: 'Calibri',
        marginBottom: 8

    }
})









